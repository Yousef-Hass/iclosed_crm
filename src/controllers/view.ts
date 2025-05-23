import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import prisma from '../config/database';

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const getViews = async (req: Request, res: Response) => {
  try {
    const { pipelineId } = req.params;

    const views = await prisma.view.findMany({
      where: { pipelineId },
      include: {
        stages: true
      }
    });

    res.json(views);
  } catch (error) {
    console.error('Get views error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const createView = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, type, config } = req.body;
    const { pipelineId } = req.params;

    const view = await prisma.view.create({
      data: {
        name,
        type,
        config,
        pipelineId
      },
      include: {
        stages: true
      }
    });

    res.json(view);
  } catch (error) {
    console.error('Create view error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getView = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const view = await prisma.view.findUnique({
      where: { id },
      include: {
        stages: {
          orderBy: {
            order: 'asc'
          }
        }
      }
    });

    if (!view) {
      return res.status(404).json({ error: 'View not found' });
    }

    res.json(view);
  } catch (error) {
    console.error('Get view error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateView = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { name, type, config } = req.body;

    const view = await prisma.view.update({
      where: { id },
      data: {
        name,
        type,
        config
      }
    });

    res.json(view);
  } catch (error) {
    console.error('Update view error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteView = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.view.delete({
      where: { id }
    });

    res.json({ message: 'View deleted successfully' });
  } catch (error) {
    console.error('Delete view error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Stage Controllers
export const getViewStages = async (req: Request, res: Response) => {
  try {
    const { viewId } = req.params;

    const stages = await prisma.stage.findMany({
      where: { viewId },
      orderBy: {
        order: 'asc'
      }
    });

    res.json(stages);
  } catch (error) {
    console.error('Get view stages error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const createStage = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { viewId } = req.params;
    const { name, criteria, order } = req.body;

    const stage = await prisma.stage.create({
      data: {
        name,
        criteria,
        order,
        viewId
      }
    });

    res.status(201).json(stage);
  } catch (error) {
    console.error('Create stage error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateStage = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { name, criteria, order } = req.body;

    const stage = await prisma.stage.update({
      where: { id },
      data: {
        name,
        criteria,
        order
      }
    });

    res.json(stage);
  } catch (error) {
    console.error('Update stage error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteStage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.stage.delete({
      where: { id }
    });

    res.json({ message: 'Stage deleted successfully' });
  } catch (error) {
    console.error('Delete stage error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateStageOrder = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { order } = req.body;

    const stage = await prisma.stage.update({
      where: { id },
      data: { order }
    });

    res.json(stage);
  } catch (error) {
    console.error('Update stage order error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

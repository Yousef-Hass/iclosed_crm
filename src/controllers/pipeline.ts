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

export const getPipelines = async (_req: AuthRequest, res: Response) => {
  try {
    const pipelines = await prisma.pipeline.findMany({
      include: {
        _count: {
          select: {
            views: true,
            statuses: true
          }
        }
      }
    });
    res.json(pipelines);
  } catch (error) {
    console.error('Get pipelines error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const createPipeline = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description } = req.body;

    const pipeline = await prisma.pipeline.create({
      data: {
        name,
        description,
        organizationId: 'default',
        statuses: {
          create: [
            { name: 'New', color: '#808080', order: 0 },
            { name: 'In Progress', color: '#0000FF', order: 1 },
            { name: 'Completed', color: '#008000', order: 2 }
          ]
        }
      },
      include: {
        statuses: true
      }
    });

    res.status(201).json(pipeline);
  } catch (error) {
    console.error('Create pipeline error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getPipeline = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const pipeline = await prisma.pipeline.findUnique({
      where: { id },
      include: {
        views: true,
        statuses: {
          orderBy: {
            order: 'asc'
          }
        }
      }
    });

    if (!pipeline) {
      return res.status(404).json({ error: 'Pipeline not found' });
    }

    res.json(pipeline);
  } catch (error) {
    console.error('Get pipeline error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updatePipeline = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { name, description } = req.body;

    const pipeline = await prisma.pipeline.update({
      where: { id },
      data: {
        name,
        description
      }
    });

    res.json(pipeline);
  } catch (error) {
    console.error('Update pipeline error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deletePipeline = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.pipeline.delete({
      where: { id }
    });

    res.json({ message: 'Pipeline deleted successfully' });
  } catch (error) {
    console.error('Delete pipeline error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


export const getPipelineViews = async (req: AuthRequest, res: Response) => {
  try {
    const { pipelineId } = req.params;

    const views = await prisma.view.findMany({
      where: { pipelineId },
      include: {
        stages: {
          orderBy: {
            order: 'asc'
          }
        }
      }
    });

    res.json(views);
  } catch (error) {
    console.error('Get pipeline views error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


export const createView = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { pipelineId } = req.params;
    const { name, type, config } = req.body;

    const view = await prisma.view.create({
      data: {
        name,
        type,
        config,
        pipelineId
      }
    });

    res.status(201).json(view);
  } catch (error) {
    console.error('Create view error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


export const getPipelineStatuses = async (req: AuthRequest, res: Response) => {
  try {
    const { pipelineId } = req.params;

    const statuses = await prisma.status.findMany({
      where: { pipelineId },
      orderBy: {
        order: 'asc'
      }
    });

    res.json(statuses);
  } catch (error) {
    console.error('Get pipeline statuses error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const createStatus = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { pipelineId } = req.params;
    const { name, color, order } = req.body;

    const status = await prisma.status.create({
      data: {
        name,
        color,
        order,
        pipelineId
      }
    });

    res.status(201).json(status);
  } catch (error) {
    console.error('Create status error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

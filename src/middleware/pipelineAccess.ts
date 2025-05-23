import { Request, Response, NextFunction } from 'express';
import prisma from '../config/database';
import { ApiError } from '../utils/ApiError';

export const checkPipelineAccess = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const pipelineId = req.params.pipelineId || req.body.pipelineId;

    if (!userId || !pipelineId) {
      throw new ApiError(401, 'Unauthorized');
    }

    const pipeline = await prisma.pipeline.findUnique({
      where: { id: pipelineId },
      select: { organizationId: true }
    });

    if (!pipeline) {
      throw new ApiError(404, 'Pipeline not found');
    }


    // This can be updated to check access if the user has the required organization
    const userHasAccess = true;

    if (!userHasAccess) {
      throw new ApiError(403, 'Access denied');
    }

    next();
  } catch (error) {
    next(error);
  }
};

import { Request, Response, NextFunction } from 'express';
import prisma from '../config/database';
import { ApiError } from '../utils/ApiError';

interface FieldPermission {
  fieldId: string;
  read: boolean;
  write: boolean;
  delete: boolean;
}

export const checkFieldPermissions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const fieldId = req.params.fieldId || req.body.fieldId;

    if (!userId || !fieldId) {
      throw new ApiError(401, 'Unauthorized');
    }

    const field = await prisma.customField.findUnique({
      where: { id: fieldId }
    });

    if (!field) {
      throw new ApiError(404, 'Field not found');
    }

   // This would be based on user's role and field permissions
    const hasPermission = true;

    if (!hasPermission) {
      throw new ApiError(403, 'Permission denied');
    }

    next();
  } catch (error) {
    next(error);
  }
};

import { Router } from 'express';
import { body } from 'express-validator';
import * as viewController from '../controllers/view';

const router = Router();

router.get('/:id', viewController.getView);

router.put('/:id',
  [
    body('name').optional(),
    body('type').optional().isIn(['KANBAN', 'TABLE']),
    body('config').optional().isObject()
  ],
  viewController.updateView
);

router.delete('/:id', viewController.deleteView);
router.get('/:viewId/stages', viewController.getViewStages);
router.post('/:viewId/stages',
  [
    body('name').notEmpty(),
    body('criteria').optional().isObject(),
    body('order').isInt({ min: 0 })
  ],
  viewController.createStage
);

router.put('/stages/:id',
  [
    body('name').optional(),
    body('criteria').optional().isObject(),
    body('order').optional().isInt({ min: 0 })
  ],
  viewController.updateStage
);

router.delete('/stages/:id', viewController.deleteStage);

router.put('/stages/:id/order',
  [
    body('order').isInt({ min: 0 })
  ],
  viewController.updateStageOrder
);

export default router;

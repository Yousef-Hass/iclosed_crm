import { Router } from 'express';
import { body } from 'express-validator';
import * as pipelineController from '../controllers/pipeline';
import * as viewController from '../controllers/view';
const router = Router();

router.get('/', pipelineController.getPipelines);

router.post('/',
  [
    body('name').notEmpty(),
    body('description').optional()
  ],
  pipelineController.createPipeline
);

router.get('/:id', pipelineController.getPipeline);

router.put('/:id',
  [
    body('name').optional(),
    body('description').optional()
  ],
  pipelineController.updatePipeline
);

router.delete('/:id', pipelineController.deletePipeline);
router.get('/:pipelineId/views', pipelineController.getPipelineViews);
router.post('/:pipelineId/views',
  [
    body('name').notEmpty(),
    body('type').isIn(['KANBAN', 'TABLE']),
    body('config').optional().isObject()
  ],
  viewController.createView
);

router.get('/:pipelineId/views/:viewId', viewController.getView);

router.put('/:pipelineId/views/:viewId',
  [
    body('name').optional(),
    body('type').optional().isIn(['KANBAN', 'TABLE']),
    body('config').optional().isObject()
  ],
  viewController.updateView
);

router.delete('/:pipelineId/views/:viewId', viewController.deleteView);

// Status routes
router.get('/:pipelineId/statuses', pipelineController.getPipelineStatuses);

router.post('/:pipelineId/statuses',
  [
    body('name').notEmpty(),
    body('color').matches(/^#[0-9A-F]{6}$/i),
    body('order').isInt({ min: 0 })
  ],
  pipelineController.createStatus
);

export default router;

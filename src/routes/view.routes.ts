import { Router } from 'express';
import * as viewController from '../controllers/view';
import { validate } from '../middleware/validate';
import { checkPipelineAccess } from '../middleware/pipelineAccess';
import { createViewSchema, updateViewSchema, deleteViewSchema } from '../schemas/view.schema';

const router = Router();

router.get('/pipeline/:pipelineId/views', checkPipelineAccess, viewController.getViews);
router.post('/pipeline/:pipelineId/views', validate(createViewSchema), checkPipelineAccess, viewController.createView);
router.get('/views/:id', checkPipelineAccess, viewController.getView);
router.put('/views/:id', validate(updateViewSchema), checkPipelineAccess, viewController.updateView);
router.delete('/views/:id', validate(deleteViewSchema), checkPipelineAccess, viewController.deleteView);

export default router;

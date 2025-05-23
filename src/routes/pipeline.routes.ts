import { Router } from 'express';
import * as pipelineController from '../controllers/pipeline';
import { validate } from '../middleware/validate';
import { checkPipelineAccess } from '../middleware/pipelineAccess';
import { createPipelineSchema, updatePipelineSchema, deletePipelineSchema } from '../schemas/pipeline.schema';

const router = Router();

router.get('/', pipelineController.getPipelines);
router.post('/', validate(createPipelineSchema), pipelineController.createPipeline);
router.get('/:id', checkPipelineAccess, pipelineController.getPipeline);
router.put('/:id', validate(updatePipelineSchema), checkPipelineAccess, pipelineController.updatePipeline);
router.delete('/:id', validate(deletePipelineSchema), checkPipelineAccess, pipelineController.deletePipeline);

export default router;

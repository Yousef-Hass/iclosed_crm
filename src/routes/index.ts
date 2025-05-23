import { Router } from 'express';
import authRoutes from './auth';
import pipelineRoutes from './pipeline';
import viewRoutes from './view';
import contactRoutes from './contact';

const router = Router();

router.get('/health', (_, res) => {
  res.json({ status: 'ok' });
});

router.use('/auth', authRoutes);
router.use('/pipelines', pipelineRoutes);
router.use('/views', viewRoutes);
router.use('/contacts', contactRoutes);

export default router;

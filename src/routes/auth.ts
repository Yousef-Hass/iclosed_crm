import { Router } from 'express';
import { body } from 'express-validator';
import * as authController from '../controllers/auth';
import { auth } from '../middleware/auth';

const router = Router();

router.post('/register',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('name').notEmpty()
  ],
  authController.register
);

router.post('/login',
  [
    body('email').isEmail(),
    body('password').notEmpty()
  ],
  authController.login
);

router.post('/logout', auth, authController.logout);

router.get('/me', auth, authController.getProfile);

export default router;

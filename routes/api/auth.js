import express from 'express';
import { validateBody } from '../../middlewares/validateBody.js';
import { authenticate } from '../../middlewares/authenticate.js';
import { schemas } from '../../models/user.js';
import { upload } from '../../middlewares/upload.js';
import ctrl from '../../controllers/auth.js';

const router = express.Router();

router.post('/register', validateBody(schemas.registerSchema), ctrl.register);

router.get('/verify/:verificationToken', ctrl.verifyEmail);

router.post(
  '/verify',
  validateBody(schemas.emailSchema),
  ctrl.resendVerifyEmail
);

router.post('/login', validateBody(schemas.loginSchema), ctrl.login);

router.get('/current', authenticate, ctrl.getCurrent);

router.post('/logout', authenticate, ctrl.logout);

router.patch(
  '/',
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  ctrl.updateSubscription
);

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  ctrl.updateAvatar
);

export default router;

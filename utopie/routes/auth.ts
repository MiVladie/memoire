import express from 'express';

import * as authValidator from '@/controllers/auth/validation';
import * as authController from '@/controllers/auth';

const router = express.Router();

router.post('/signin', authValidator.signIn, authController.postSignIn);

export default router;

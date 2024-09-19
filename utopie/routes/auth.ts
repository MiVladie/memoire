import express from 'express';

import * as authValidator from '@/controllers/auth/validation';
import * as authController from '@/controllers/auth';

const router = express.Router();

router.get('/authenticate', authValidator.authenticate, authController.getAuthenticate);
router.post('/signin', authValidator.signIn, authController.postSignIn);
router.post('/signup', authValidator.signUp, authController.postSignUp);

export default router;

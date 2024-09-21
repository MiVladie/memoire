import express from 'express';

import * as authValidator from '@/controllers/auth/validation';
import * as authController from '@/controllers/auth';

const router = express.Router();

router.get('/authenticate', authValidator.authenticate, authController.getAuthenticate);
router.post('/signin', authValidator.signIn, authController.postSignIn);
router.post('/signup', authValidator.signUp, authController.postSignUp);
router.post('/recover', authValidator.recover, authController.postRecover);
router.post('/verify', authValidator.verify, authController.postVerify);
router.post('/reset', authValidator.reset, authController.postReset);

export default router;

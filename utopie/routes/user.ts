import express from 'express';

import * as userValidator from '@/controllers/user/validation';
import * as userController from '@/controllers/user';

const router = express.Router();

router.patch('/', userValidator.update, userController.patchUpdate);
router.patch('/password', userValidator.password, userController.patchPassword);

export default router;

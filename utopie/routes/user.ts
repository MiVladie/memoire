import express from 'express';

import * as userValidator from '@/controllers/user/validation';
import * as userController from '@/controllers/user';

const router = express.Router();

router.patch('/', userValidator.update, userController.patchUpdate);

export default router;

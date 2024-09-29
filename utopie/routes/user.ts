import express from 'express';

import * as userValidator from '@/controllers/user/validation';
import * as userController from '@/controllers/user';

import { withImage } from '@/middleware/withFile';

const router = express.Router();

router.get('/playlists', userValidator.playlists, userController.getPlaylists);
router.patch('/', userValidator.update, userController.patchUpdate);
router.patch('/password', userValidator.password, userController.patchPassword);
router.post('/image', withImage, userController.postImage);
router.delete('/image', userController.deleteImage);

export default router;

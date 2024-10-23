import express from 'express';

import * as songValidator from '@/controllers/song/validation';
import * as songController from '@/controllers/song';

const router = express.Router();

router.get('/:id/media', songValidator.getMedia, songController.getMedia);

export default router;

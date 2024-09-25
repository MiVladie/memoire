import express from 'express';
import path from 'path';

import { File } from '@/constants';

const router = express.Router();

router.use('/images', express.static(path.join(File.PUBLIC_PATH, File.IMAGES_PATH)));

export default router;

import express from 'express';
import path from 'path';

import { Path } from '@/constants';

const router = express.Router();

router.use('/images', express.static(path.join(Path.PUBLIC_DIR, Path.Shared.images)));

export default router;

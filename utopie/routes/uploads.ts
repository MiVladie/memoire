import express from 'express';
import path from 'path';

import { Path } from '@/constants';

const router = express.Router();

router.use('/images', express.static(Path.Shared.images));

export default router;

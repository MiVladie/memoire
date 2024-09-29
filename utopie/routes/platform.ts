import express from 'express';

import * as platformController from '@/controllers/platform';

const router = express.Router();

router.get('/', platformController.get);

export default router;

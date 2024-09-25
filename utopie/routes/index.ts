import { withUser } from '@/middleware/withUser';

import express from 'express';

import authRoutes from '@/routes/auth';
import userRoutes from '@/routes/user';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/me', withUser, userRoutes);

export default router;

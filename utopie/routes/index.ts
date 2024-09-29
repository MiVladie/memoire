import express from 'express';

import authRoutes from '@/routes/auth';
import platformRoutes from '@/routes/platform';
import userRoutes from '@/routes/user';

import withUser from '@/middleware/withUser';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/platforms', platformRoutes);
router.use('/me', withUser, userRoutes);

export default router;

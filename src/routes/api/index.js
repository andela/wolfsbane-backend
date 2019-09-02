import express from 'express';
import userRoute from './users';
import authRoutes from './auth';
import resetPasswordRoute from './resetPassword';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoute);
router.use('/', resetPasswordRoute);

export default router;

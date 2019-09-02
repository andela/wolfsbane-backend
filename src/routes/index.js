import express from 'express';
import userRoute from './api/users';
import authRoutes from './api/auth';
import resetPasswordRoute from './api/resetPassword';
import accommodationRoute from './api/accommodation';
import roomRoute from './api/room';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoute);
router.use('/', resetPasswordRoute);
router.use('/', accommodationRoute);
router.use('/', roomRoute);

export default router;

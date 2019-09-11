import { Router } from 'express';
import userRoute from './api/users';
import authRoutes from './api/auth';
import profileRoutes from './api/profile';
import resetPasswordRoute from './api/resetPassword';
import accommodationRoute from './api/accommodation';
import roomRoute from './api/room';
import commentsRoute from './api/comments';


const router = new Router();

router.use('/', resetPasswordRoute);
router.use('/', accommodationRoute);
router.use('/', roomRoute);
router.use('/auth', authRoutes);
router.use('/users', userRoute);
router.use('/profiles', profileRoutes);
router.use('/', commentsRoute);


export default router;

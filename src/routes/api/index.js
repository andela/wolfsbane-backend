import express from 'express';
import userRoute from './users';
import authRoutes from './auth';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to wolfsbane server' });
});
router.use('/', userRoute);
router.use('/auth', authRoutes);

export default router;

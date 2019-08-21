import express from 'express';
import userRoute from './users';

const router = express.Router();

router.use('/', userRoute);

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to wolfsbane server' });
});

export default router;

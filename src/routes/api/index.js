import express from 'express';
import userRoute from './users';

const router = express.Router();

router.use('/', userRoute);

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to wolfsbane server' });
});

// Test route
router.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce((errors, key) => {
        errors[key] = err.errors[key].message;
        return errors;
      }, {})
    });
  }

  return next(err);
});
export default router;

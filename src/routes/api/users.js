import express from 'express';
import middlewares from '../../middlewares';

const { validate } = middlewares;
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'welcome user' });
});

// validation test route
router.post('/', validate('userRegister'), (req, res) => {
  res.status(201).json({ message: 'success' });
});

module.exports = router;

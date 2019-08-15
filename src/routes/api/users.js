import express from 'express';

const router = express.Router();

router.get('/users', (req, res, next) => {
  res.send('welcome user');
});


module.exports = router;

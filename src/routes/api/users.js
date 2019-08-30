import express from 'express';
import middlewares from '../../middlewares';
import registerUser from '../../controllers';

const { validate } = middlewares;

const router = express.Router();

router.post('/users/signup', validate('userRegister'), registerUser);

export default router;

import express from 'express';
import middlewares from '../../middlewares';
import { UsersController } from '../../controllers';

const { validate } = middlewares;
const { registerUser } = UsersController;

const router = express.Router();

router.post('/signup', validate('userRegister'), registerUser);

export default router;

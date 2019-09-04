import express from 'express';
import middlewares from '../../middlewares';
import { UsersController } from '../../controllers';

const { validate } = middlewares;
const { registerUser, signInUser } = UsersController;

const router = express.Router();

router.post('/signup', validate('userRegister'), registerUser);
router.post('/signin', validate('userLogin'), signInUser);

export default router;

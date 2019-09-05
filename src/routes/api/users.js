import express from 'express';
import middlewares from '../../middlewares';
import { UsersController } from '../../controllers';

const { validate } = middlewares;
const { registerUser, signInUser, confirmUser } = UsersController;

const router = express.Router();

router.post('/signup', validate('userRegister'), registerUser);
router.post('/signin', validate('userLogin'), signInUser);
router.get('/confirmAccount', confirmUser);

export default router;

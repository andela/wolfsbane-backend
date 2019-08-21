import { Router } from 'express';
import middlewares from '../../middlewares';
import ResetPasswordController from '../../controllers/resetPassword';

const {
  sendPasswordResetEmail,
  setNewPassword
} = ResetPasswordController;
const { validate } = middlewares;

const resetPasswordRoutes = new Router();
resetPasswordRoutes.post('/forgotpassword', validate('forgotPassword'), sendPasswordResetEmail);
resetPasswordRoutes.post('/resetpassword/:userId', validate('resetPassword'), setNewPassword);

export default resetPasswordRoutes;

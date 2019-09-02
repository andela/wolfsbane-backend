import { Router } from 'express';
import Auth from '../../controllers/authController';

const router = Router();

router.get('/google', Auth.authenticate('google', ['email', 'profile']));
router.get('/google/callback', Auth.callback('google'));

router.get('/facebook', Auth.authenticate('facebook', ['email']));
router.get('/facebook/callback', Auth.callback('facebook'));

export default router;

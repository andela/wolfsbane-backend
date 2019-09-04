import { Router } from 'express';
import { callback, authenticate } from '../../controllers/authController';

const router = Router();

router.get('/google', authenticate('google', ['email', 'profile']));
router.get('/google/callback', callback('google'));

router.get('/facebook', authenticate('facebook', ['email']));
router.get('/facebook/callback', callback('facebook'));

export default router;

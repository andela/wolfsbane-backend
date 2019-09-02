import { Router } from 'express';
import api from './api';


const router = new Router();

router.use('/api/v1', api);

export default router;

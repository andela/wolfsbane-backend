import { Router } from 'express';
import RequestController from '../../controllers/requestController';
import middlewares from '../../middlewares';

const {
  createRequest, deleteRequest, getAllTripRequests,
  getATripRequest, managerGetRequest
} = RequestController;

const requestRoutes = new Router();

const { Authenticate, validate } = middlewares;
const {
  verifyToken, verifyUser, verifyRequest,
} = Authenticate;

requestRoutes.get('/manager', verifyToken, verifyRequest, managerGetRequest);
requestRoutes.post('/:departmentId', verifyToken, verifyUser, validate('RequestMail'), createRequest);
requestRoutes.delete('/:id', verifyToken, verifyUser, deleteRequest);
requestRoutes.get('/', verifyToken, verifyUser, getAllTripRequests);
requestRoutes.get('/:id', verifyToken, verifyUser, getATripRequest);
export default requestRoutes;

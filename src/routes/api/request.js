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
  verifyToken, verifyUser, verifyRequest
} = Authenticate;

requestRoutes.post('/:departmentId', verifyToken, verifyUser, validate('RequestMail'), createRequest);
requestRoutes.delete('/:id', verifyToken, verifyUser, deleteRequest);
requestRoutes.get('/', verifyToken, verifyUser, getAllTripRequests);
requestRoutes.get('/:id', verifyToken, verifyUser, getATripRequest);
requestRoutes.get('/manager/:departmentId', verifyToken, verifyRequest, managerGetRequest);
export default requestRoutes;

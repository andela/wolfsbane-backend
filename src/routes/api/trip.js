import { Router } from 'express';
import middlewares from '../../middlewares';
import TripController from '../../controllers/tripController';

const tripRoutes = new Router();
const { validate, Authenticate } = middlewares;

const { createTrip, updateTrip } = TripController;

const { verifyToken, verifyUser, verifyRequestOwner } = Authenticate;

tripRoutes.post('/:requestId', verifyToken, verifyUser, validate('TripRequest'), verifyRequestOwner, createTrip);
tripRoutes.put('/:requestId/:tripId', verifyToken, verifyUser, updateTrip);
export default tripRoutes;

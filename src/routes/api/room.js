import { Router } from 'express';
import { RoomController } from '../../controllers';
import middlewares from '../../middlewares';

const router = new Router();

const { validate, Authenticate } = middlewares;
const { verifyToken, verifyTravelAdmin } = Authenticate;
const {
  createRoom, updateRoom, deleteRoom, getRoomById, getRoomByAccommodation
} = RoomController;

router.post('/accommodations/:accommodationId/rooms', verifyToken, verifyTravelAdmin, validate('createRoom'), createRoom);
router.put('/rooms/:roomId', verifyToken, verifyTravelAdmin, validate('updateRoom'), updateRoom);
router.delete('/rooms/:roomId', verifyToken, verifyTravelAdmin, validate('checkRoomId'), deleteRoom);
router.get('/rooms/:roomId', verifyToken, validate('checkRoomId'), getRoomById);
router.get('/accommodations/:accommodationId/rooms', verifyToken, validate('checkAccommodationId'), getRoomByAccommodation);

export default router;

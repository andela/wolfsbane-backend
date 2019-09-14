import { Router } from 'express';
import { AccommodationController } from '../../controllers';
import middlewares from '../../middlewares';

const router = new Router();

const { validate, Authenticate } = middlewares;
const { verifyToken, verifyTravelAdmin } = Authenticate;

const {
  createAccommodation, getAccommodation, getAccommodationById, updateAccommodation,
  deleteAccommodation, likeAccommodation, dislikeAccommodation
} = AccommodationController;

router.post('/accommodations', verifyToken, verifyTravelAdmin, validate('createAccommodation'), createAccommodation);
router.get('/accommodations', verifyToken, getAccommodation);
router.get('/accommodations/:accommodationId', verifyToken, validate('checkAccommodationId'), getAccommodationById);
router.put('/accommodations/:accommodationId', verifyToken, verifyTravelAdmin, validate('updateAccommodation'), updateAccommodation);
router.delete('/accommodations/:accommodationId', verifyToken, verifyTravelAdmin, validate('checkAccommodationId'), deleteAccommodation);
router.post('/accommodations/:accommodationId/like', verifyToken, validate('checkAccommodationId'), likeAccommodation);
router.post('/accommodations/:accommodationId/unlike', verifyToken, validate('checkAccommodationId'), dislikeAccommodation);

export default router;

import { Router } from 'express';
import ProfileController from '../../controllers/profileController';
import middleware from '../../middlewares';

const { Authenticate, validate } = middleware;

const router = Router();

router.route('/')
  .post(
    Authenticate.verifyToken, ProfileController.upsertProfile
  )
  .get(
    Authenticate.verifyToken, Authenticate.verifySuperOrManager, ProfileController.getAllProfiles
  );
  
router.route('/:userId')
  .get(
    Authenticate.verifyToken, validate('checkUserId'), Authenticate.verifyProfileRights, ProfileController.getProfile
  )
  .put(
    Authenticate.verifyToken, validate('checkUserId'), Authenticate.verifyProfileRights, ProfileController.upsertProfile
  );
  
router.route('/:userId/roles')
  .put(
    Authenticate.verifyToken, validate('checkUserId'), Authenticate.verifySuperAdmin, ProfileController.updateRole
  );

export default router;

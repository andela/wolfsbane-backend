import {
  userRegister, userLogin,
  forgotPassword, resetPassword, createAccommodation, updateAccommodation,
  createRoom, updateRoom, checkRoomId, checkAccommodationId, TripRequest, RequestMail,
  checkUserId
} from './validators/rules';

const getValidator = (validationName) => {
  const rules = {
    userRegister,
    userLogin,
    forgotPassword,
    resetPassword,
    createAccommodation,
    updateAccommodation,
    checkAccommodationId,
    createRoom,
    updateRoom,
    checkRoomId,
    checkUserId,
    TripRequest,
    RequestMail
  };

  return rules[validationName];
};

export default getValidator;

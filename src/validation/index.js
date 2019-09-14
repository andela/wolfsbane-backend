import {
  userRegister, userLogin,
  forgotPassword, resetPassword, createAccommodation, updateAccommodation,
  createRoom, updateRoom, checkRoomId, checkAccommodationId,
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
    checkUserId
  };

  return rules[validationName];
};

export default getValidator;

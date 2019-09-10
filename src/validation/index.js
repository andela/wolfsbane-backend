import {
  userRegister, userLogin,
  forgotPassword, resetPassword, createAccommodation, updateAccommodation,
  createRoom, updateRoom, checkRoomId, checkAccommodationId
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
    checkRoomId
  };

  return rules[validationName];
};

export default getValidator;

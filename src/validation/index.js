import {
  userRegister, userLogin,
  forgotPassword, resetPassword
} from './validators/rules';

const getValidator = (validationName) => {
  const rules = {
    userRegister,
    userLogin,
    forgotPassword,
    resetPassword
  };

  return rules[validationName];
};

export default getValidator;

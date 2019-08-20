import { userRegister, userLogin } from './validators/rules';

const getValidator = (validationName) => {
  const rules = {
    userRegister,
    userLogin
  };

  return rules[validationName];
};

export default getValidator;

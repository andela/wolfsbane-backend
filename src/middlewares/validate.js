import { validationResult } from 'express-validator';
import getValidator from '../validation';

export default (validationName) => {
  const rules = getValidator(validationName);
  return [
    ...rules,
    (req, res, next) => {
      const errors = validationResult(req);
      const resErrorMsg = {};
      errors.array().forEach((error) => {
        resErrorMsg[error.param] = error.msg;
      });
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: resErrorMsg });
      }
      return next();
    }
  ];
};

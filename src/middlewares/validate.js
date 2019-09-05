import { validationResult } from 'express-validator';
import getValidator from '../validation';

/**
 * @function validate
 * @description Middleware function validate user input data
 * @param {string} validationName - The name matching a specific rule to apply
 * @returns {object} - If error returns an error response object
 * @returns {function}- If no error calls the Next middleware
 */
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

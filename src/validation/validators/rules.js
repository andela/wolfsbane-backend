import { check, body } from 'express-validator';

// add validation rules here.

/* regex description
the regex /^[A-Za-z\-']{2,250}$/
is made up of a single character set, between
[], with a quantifier {2,250}

A-Za-z => matches upper and lowercase alphabets
\-' => matches a - and a '

the last {2,250} is a quantifier specifying that the character been matched
should be > 1 and <= 250

the ^ and $ runs the match from the beginning and end of the string
*/

const nameRegex = /^[A-Za-z\-']{2,250}$/;
export const userRegister = [
  check('firstName')
    .matches(nameRegex)
    .withMessage('firstName should be an alphabet between 2 and 250 characters')
    .trim(),
  check('lastName')
    .matches(nameRegex)
    .withMessage('lastName should be an alphabet between 2 and 250 characters')
    .trim(),
  check('password', 'password should be at least 6 characters').isLength({ min: 6 }),
  check('email', 'Please provide a valid email')
    .isEmail()
    .isLength({ min: 3, max: 250 })
    .trim()
];

export const userLogin = [
  check('email', 'email is invalid, please provide a valid mail')
    .isEmail()
    .not()
    .isEmpty(),
  check('password', 'password should be at least 6 characters')
    .isLength({ min: 6 })
    .not()
    .isEmpty(),
];

export const forgotPassword = [
  check('email', 'Please provide a valid email')
    .isEmail()
    .not()
    .isEmpty()
];

export const resetPassword = [
  check('password', 'password should be at least 6 characters').isLength({ min: 6 }),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match');
    }
    return true;
  })
];

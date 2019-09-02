import { check, body, param } from 'express-validator';

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

// Regex to check for valid uuid
const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

// UUID checker
const checkUuid = (input, message) => param(input)
  .not()
  .isEmpty()
  .matches(uuidRegex)
  .withMessage(message);

export const checkUserId = [
  checkUuid('userId', 'Invalid user Id')
];

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

export const createAccommodation = [
  check('name', 'Accommodation name is required').not().isEmpty(),
  check('address', 'Address is required').not().isEmpty(),
  check('image', 'Invalid image path').optional().not().isEmpty(),
];

export const updateAccommodation = [
  param('accommodationId')
    .not()
    .isEmpty()
    .matches(uuidRegex)
    .withMessage('Invalid AccommodationId'),
  check('name', 'Accommodation name is required').not().isEmpty(),
  check('address', 'Address is required').not().isEmpty(),
  check('image', 'Invalid image path').optional().not().isEmpty()
];

export const createRoom = [
  param('accommodationId')
    .not()
    .isEmpty()
    .matches(uuidRegex)
    .withMessage('Invalid AccommodationId'),
  check('type', 'Address is required').not().isEmpty(),
  check('capacity', 'Capacity is required').not().isEmpty().isInt(),
  check('image', 'Image is required').optional().not().isEmpty(),
];
export const updateRoom = [
  param('roomId')
    .not()
    .isEmpty()
    .matches(uuidRegex)
    .withMessage('Invalid RoomId'),
  check('type', 'Address is required').not().isEmpty(),
  check('capacity', 'Capacity is required').not().isEmpty().isInt()
];
export const checkRoomId = [
  checkUuid('roomId', 'Invalid Room Id')
];
export const checkAccommodationId = [
  checkUuid('accommodationId', 'Invalid Accommodation Id')
];

import passport from 'passport';
import { generateToken } from '../utils';
import passportConfIgnored from '../config/passport';

/**
   * It receives the social provider to use for authentication and returns an express
   * controller function to handle the callback request that happens after an
   * authentication attempt has happened
   * @function callback
   * @param {string} provider
   * @returns {function} callbackFunction
*/
export const callback = provider => (req, res, next) => {
  passport.authenticate(
    provider,
    (err, user) => {
      // check if authentication returns an error
      if (err || !user) return res.status(500).json({ status: 500, message: 'Registration unsuccessful. Please try again later.' });
      
      // process successfully authenticated and registered user
      const { id: userId } = user;
      const token = generateToken({ userId });
      res.status(res.statusCode).json({ status: res.statusCode, token });
    }
  )(req, res, next);
};
/**
   * It receives the social provider to use for authentication and returns
   * an express controller function that handles the initial request that
   * seeks authentication from the social platforms
   * @function authenticate
   * @param {string} provider The social platform to authenticate with
   * @param {Array} scope The scope of data to request from the platform
   * @returns {function} authenticatedFunction
*/
export const authenticate = (provider, scope) => {
  try {
    const authenticateFunction = passport.authenticate(
      provider,
      { session: false, scope }
    );
    return authenticateFunction;
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Authentication unsuccessful. Please try again later.' });
  }
};

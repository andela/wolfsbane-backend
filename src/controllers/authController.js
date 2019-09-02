import passport from 'passport';
import { generateToken, errorResponse, successResponse } from '../utils';
import passportConfIgnored from '../config/passport';

/**
   * It contains the controller methods that handle requests to the profile
   * endpoint entity
   * @class authController
*/
export default class authController {
  /**
     * It receives the social provider to use for authentication and returns an express
     * controller function to handle the callback request that happens after an
     * authentication attempt has happened
     * @function callback
     * @param {string} provider
     * @returns {function} callbackFunction
  */
  static callback(provider) {
    return (req, res, next) => {
      passport.authenticate(
        provider,
        async (err, user) => {
          // check if authentication returns an error
          if (err || !user) return errorResponse(res, 500, 'Registration unsuccessful. Please try again later.');
          
          // process successfully authenticated and registered user
          const { id: userId } = user;
          const token = await generateToken({ userId });
          return successResponse(res, 200, 'Registration successful', {}, token);
        }
      )(req, res, next);
    };
  }
  
  /**
     * It receives the social provider to use for authentication and returns
     * an express controller function that handles the initial request that
     * seeks authentication from the social platforms
     * @function authenticate
     * @param {string} provider The social platform to authenticate with
     * @param {Array} scope The scope of data to request from the platform
     * @returns {function} authenticatedFunction
  */
  static authenticate(provider, scope) {
    const authenticateFunction = passport.authenticate(
      provider,
      { session: false, scope }
    );
    return authenticateFunction;
  }
}

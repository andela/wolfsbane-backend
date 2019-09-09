import Jwt from 'jsonwebtoken';
import {
  messages, status, errorResponse
} from '../utils/index';

const Auth = {
/**
     * @method verifyToken
     * @description Method for validating the user token
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} response body object
     */

  async verifyToken(req, res, next) {
    const token = req.headers.authorization;
    try {
      if (!token) {
        return errorResponse(res, status.bad, messages.authentication.auth);
      }
      const decoded = Jwt.verify(token, process.env.SECRET);
      req.user = decoded;
    } catch (error) {
      return errorResponse(res, status.error, messages.authentication.error);
    }
    return next();
  }
};


export default Auth;

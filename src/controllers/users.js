
import models from '../models';
import {
  status, messages, hashPassword, generateToken,
  successResponse, errorResponse, conflictResponse
} from '../utils/index';

/**
 * @class UserController
 * @description Controllers for Users
 * @exports UsersController
 */
export default class UsersController {
  /**
   * @method registerUser
   * @description Method for user registration
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} response body object
   */
  static async registerUser(req, res) {
    try {
      const { email } = req.body;
      const userExits = await models.Users.findOne({ where: { email } });
      if (userExits) {
        return conflictResponse(res, status.conflict, messages.signUp.conflict);
      }

      req.body.password = await hashPassword(req.body.password);
      const user = await models.Users.create(req.body);
      const response = user.toJSON();

      delete response.password;
      const { id: userId } = user;
      const token = await generateToken({ userId });
      return successResponse(res, status.created, messages.signUp.success, response, token);
    } catch (error) {
      return errorResponse(res, status.error, messages.signUp.error);
    }
  }
}

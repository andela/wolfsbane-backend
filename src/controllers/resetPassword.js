import models from '../models';
import {
  hashPassword, successResponse,
  errorResponse, Jwt, getCallbackUrls
} from '../utils';
import sendEmail from '../services';

const { baseUrl } = getCallbackUrls;

/**
 * @class ResetPasswordController
 * @description Controllers for reset password
 * @exports ResetPasswordController
 */
export default class ResetPasswordController {
  /**
   * @method sendPasswordResetEmail
   * @description Method to send a reset password email
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} Email sending success response
   */
  static async sendPasswordResetEmail(req, res) {
    const { email } = req.body;
    try {
      const user = await models.Users.findOne({
        where: {
          email
        }
      });
      if (!user) {
        return errorResponse(res, 404, 'No user with email');
      }
      const {
        id: userId, password: passwordHash, createdAt, firstName
      } = user;
      const secret = `${passwordHash}-${createdAt}`;
      const token = await Jwt.generateToken({ userId }, secret);
      const url = `${baseUrl}/forgotpassword/${userId}?token=${token}`;
      await sendEmail(email, 'passwordRecovery', { firstName, url });
      return res.status(200).json(url);
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  /**
   * @method setNewPassword
   * @description Method to create a trip
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} password change success response
   */
  static async setNewPassword(req, res) {
    const { password } = req.body;
    const { token } = req.query;
    const { userId } = req.params;
    try {
      const { dataValues: user } = await models.Users.findOne({
        where: {
          id: userId
        }
      });
      const secret = `${user.password}-${user.createdAt}`;
      const payload = await Jwt.verifyToken(token, secret);
      if (payload.userId === user.id) {
        const hashedPassword = hashPassword(password);
        await models.Users.update({ password: hashedPassword }, {
          where: { id: user.id }
        });
        return successResponse(res, 202, 'Password change successful');
      }
    } catch (error) {
      return errorResponse(res, 403, 'Password reset Link invalid');
    }
  }
}

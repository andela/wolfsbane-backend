import { verifyToken, errorResponse } from '../utils';
import models from '../models';

const { Profiles, Sequelize } = models;
/**
 * @class Authenticate
 * @description authenticate tokens and roles
 * @exports Authenticate
 */
class Authenticate {
  /**
   * Verify if token is valid
   * @param  {object} req - The user request object
   * @param  {object} res - The user res response object
   * @param  {function} next - The next() Function
   * @returns {String} req.userId - The user id
   */
  static async verifyToken(req, res, next) {
    try {
      const { headers: { authorization } } = req;
      const token = authorization.split(' ')[1];
      const decoded = await verifyToken(token);
      if (!decoded) {
        return errorResponse(res, 401, 'Access denied. We could not verify user');
      }
      req.user = decoded;
      return next();
    } catch (error) {
      return errorResponse(res, 500, 'Server error');
    }
  }

  /**
   * Verify if role is Travel Admin or Super Admin
   * @param  {object} req - The user request object
   * @param  {object} res - The user res response object
   * @param  {function} next - The next() Function
   * @returns {String} req.userId - The user id
   */
  static async verifyTravelAdmin(req, res, next) {
    const { userId } = req.user;
    try {
      const verify = await Profiles.findOne({
        where: {
          userId, role: { [Sequelize.Op.or]: ['Travel Admin', 'Super Admin'] }
        },
      });
      if (!verify) {
        return errorResponse(res, 401, 'Access denied.');
      }
      return next();
    } catch (error) {
      return errorResponse(res, 500, 'Server error');
    }
  }
}

export default Authenticate;

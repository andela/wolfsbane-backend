import { verifyToken, errorResponse, status } from '../utils';
import models from '../models';

const { Profiles, Sequelize, Requests } = models;
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
      if (!token || token === '') {
        return errorResponse(res, status.unauthorized, 'Access denied.');
      }
      const decoded = await verifyToken(token);
      if (!(decoded && decoded.userId)) {
        return errorResponse(res, status.unauthorized, 'Access denied. We could not verify user');
      }
      req.user = decoded;
      return next();
    } catch (error) {
      if (error.message === 'invalid token') {
        return errorResponse(res, status.unauthorized, 'Access denied, token invalid ');
      }
      return errorResponse(res, status.error, 'Server error ');
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
    const condition = {
      where: {
        userId, role: { [Sequelize.Op.or]: ['Travel Admin', 'Super Admin'] }
      },
    };
    try {
      const verify = await Authenticate.findSuperUser(condition);
      if (!verify) {
        return errorResponse(res, status.unauthorized, 'Access denied.');
      }
      return next();
    } catch (error) {
      return errorResponse(res, status.error, 'Server error');
    }
  }

  /**
   * It abstracts out querying the Profiles table for super users
   * @function findSuperUser
   * @param {Object} condition The condition to test for in the query
   * @returns {Promise} It returns a promise on the Profiles table query
*/
  static findSuperUser(condition) {
    return Profiles.findOne(condition);
  }

  /**
   * It verifies whether the user passed
   * to it is a super admin or not.
   * @function verifySuperAdmin
   * @param {Object} req The express request object
   * @param {Object} res The express response object
   * @param {Object} next The function to call next after executing
   * @returns {function} errorResponse | next
*/
  static async verifySuperAdmin({ user }, res, next) {
    const { userId } = user;
    try {
      const { dataValues: profile } = await Profiles.findOne({ where: { userId } });
      if (profile.role !== 'Super Admin') return errorResponse(res, status.unauthorized, 'Access denied');
      return next();
    } catch (error) {
      return errorResponse(res, status.error, 'Internal server error');
    }
  }

  /**
   * It verifies the user passed to it has clearance
   * to access the profile it intends to
   * @function verifyProfileRights
   * @param {Object} req The express request object
   * @param {Object} res The express response object
   * @param {Object} next The function to call next after executing
   * @returns {function} errorResponse | next
*/
  static async verifyProfileRights({ params, user }, res, next) {
    try {
      const { dataValues: loggedInUser } = await Profiles.findOne({
        where: { userId: user.userId }
      });
      const profile = await Profiles.findOne({
        where: { userId: params.userId }
      });
      if (!profile) return errorResponse(res, status.notfound, 'User profile does not exist.');
      const { dataValues: profileOwner } = profile;
      if (
        loggedInUser.userId !== profileOwner.userId
        && loggedInUser.role !== 'Super Admin'
        && (!(loggedInUser.role === 'Manager' && loggedInUser.departmentId === profileOwner.departmentId))
      ) return errorResponse(res, status.unauthorized, 'You do not have access to this person\'s profile.');
      return next();
    } catch (error) {
      return errorResponse(res, status.error, 'Internal server error');
    }
  }

  /**
   * It verifies whether the user passed to it
   * is a super admin or a departmental manager.
   * @param  {object} req - The user request object
   * @param  {object} res - The user res response object
   * @param  {function} next - The next() Function
   * @returns {String} req.userId - The user id
   */
  static async verifySuperOrManager(req, res, next) {
    const { userId } = req.user;
    const condition = {
      where: {
        userId, role: { [Sequelize.Op.or]: ['Manager', 'Super Admin'] }
      },
    };
    try {
      const profile = await Authenticate.findSuperUser(condition);
      if (!profile) {
        return errorResponse(res, status.unauthorized, 'Access denied.');
      }
      req.role = profile.dataValues.role;
      req.departmentId = profile.dataValues.departmentId;
      return next();
    } catch (error) {
      return errorResponse(res, status.error, 'Server error');
    }
  }

  /**
   * Verify if role is Staff, Travel Admin, Manager or Super Admin
   * @param  {object} req - The user request object
   * @param  {object} res - The user res response object
   * @param  {function} next - The next() Function
   * @returns {String} req.userId - The user id
   */
  static async verifyUser(req, res, next) {
    const { userId } = req.user;
    try {
      const verify = await Profiles.findOne({
        where: {
          userId, role: { [Sequelize.Op.or]: ['Travel Admin', 'Super Admin', 'Manager', 'Staff'] }
        },
      });
      if (!verify) {
        return errorResponse(res, status.unauthorized, 'Access denied.');
      }
      return next();
    } catch (error) {
      return errorResponse(res, status.error, 'Server error');
    }
  }

  /**
   * for managers to verify if the department
   * @param  {object} req - The user request object
   * @param  {object} res - The user res response object
   * @param  {function} next - The next() Function
   * @returns {String} req.userId - The user id
   */
  static async verifyRequest(req, res, next) {
    const { userId } = req.user;
    try {
      const verify = await Profiles.findOne({
        where: {
          userId, role: { [Sequelize.Op.or]: ['Super Admin', 'Manager'] }
        },
      });
      if (!verify) {
        return errorResponse(res, status.unauthorized, 'Access denied.');
      }
      return next();
    } catch (error) {
      return errorResponse(res, status.error, 'Server error');
    }
  }

  /**
   * Verify if a request exist and belongs to the user before creating a trip
   * @param  {object} req - The user request object
   * @param  {object} res - The user res response object
   * @param  {function} next - The next() Function
   * @returns {String} - Next() or error;
   */
  static async verifyRequestOwner(req, res, next) {
    const { requestId } = req.params;
    const { userId } = req.user;
    try {
      const request = await Requests.findByPk(requestId);
      if (!request) {
        return errorResponse(res, status.notfound, 'Request not found');
      }
      if (request.userId !== userId) {
        return errorResponse(res, status.unauthorized, 'Access Denied');
      }
      return next();
    } catch (err) {
      errorResponse(res, status.error, 'error verifying requestId');
    }
  }
}


export default Authenticate;

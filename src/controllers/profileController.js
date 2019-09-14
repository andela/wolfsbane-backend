import models from '../models';
import { errorResponse, successResponse } from '../utils';

const {
  Profiles, Departments, Users, sequelize
} = models;

const profileIncludes = [
  {
    model: Departments,
    as: 'theDepartment',
    attributes: [['name', 'department']]
  },
  {
    model: Users,
    as: 'theUser',
    attributes: ['firstName', 'lastName', 'email', 'isVerified']
  }
];

const statusMessage = {
  201: 'Profile created successfully.',
  200: 'Profile updated successfully.'
};

/**
 * It contains the controller methods that handle requests to the profile
 * endpoint entity
 * @class profileController
*/
export default class profileController {
/**
   * It receives the user id to search the profiles table for in
   * the express request onject and returns the user's profile.
   * @function getProfile
   * @param {Object} req The express request object
   * @param {Object} res The express response object
   * @returns {Object} UserProfile The current user profile
*/
  static async getProfile(req, res) {
    const { params: { userId } } = req;
    try {
      const { dataValues: data } = await Profiles.findOne({
        attributes: { exclude: ['createdat', 'updatedAt'] },
        where: { userId },
        include: profileIncludes
      });
      return successResponse(res, 200, 'Profile fetched successfully', data);
    } catch (error) {
      return errorResponse(res, 500, 'Operation not successful. Please try again later.');
    }
  }
  
  /**
     * It returns all the profiles on the platform or in a department. It is a function that is
     * only available to the Super Admin of the platform, and managers for their departments
     * @function getAllProfiles
     * @param {Object} req The express request object
     * @param {Object} res The express response object
     * @returns {Array} [UserProfile] An array containing the profiles of users
  */
  static async getAllProfiles({ role, departmentId, query }, res) {
    const { limit, offset } = query;
    const queryOptions = {
      attributes: { exclude: ['createdat', 'updatedAt'] },
      include: profileIncludes,
      offset,
      limit
    };
    if (role === 'Manager') {
      queryOptions.where = { departmentId };
    }
    try {
      const data = await Profiles.findAll(queryOptions);
      return successResponse(res, 200, 'Profiles fetched successfully', data);
    } catch (error) {
      return errorResponse(res, 500, 'Operation not successful. Please try again later.');
    }
  }
  
  /**
     * It allows the user to either create or update their profile details
     * @function upsertProfile
     * @param {Object} req The express request object
     * @param {Object} res The express response object
     * @returns {Object} UserProfile The new profile just created
  */
  static async upsertProfile({ body, params, user: { userId } }, res) {
    const id = params.userId || userId;
    let transaction;
    
    try {
      transaction = await sequelize.transaction();
      
      const departmentId = await profileController.getDepartmentId(body, transaction);
      const userData = await profileController.getUserData(id, body, transaction);
      const data = await profileController.upsertData(body, id, departmentId, transaction);
      
      const status = params.userId ? 200 : 201;
      if (userData) {
        ['id', 'password', 'createdAt', 'updatedAt'].map(property => delete userData[property]);
        data.user = { ...userData };
      }
      await transaction.commit();
      return successResponse(res, status, statusMessage[status], data);
    } catch (error) {
      await transaction.rollback();
      return errorResponse(res, 500, 'Operation not successful. Please try again later.');
    }
  }
  
  /**
     * It uses the department name to get the department idd from the database
     * @function getDepartmentId
     * @param {Object} department The name of the department of the profile owner
     * @param {Object} transaction The transaction object
     * @returns {Object} express response object
  */
  static async getDepartmentId({ department: name }, transaction) {
    const { dataValues: { id: departmentId } } = await Departments.findOne(
      {
        where: { name },
        transaction
      }
    );
    return departmentId;
  }
  
  /**
     * It updates the users table of the profile owner and returns their user data
     * @function getUserData
     * @param {Object} id The id of the user to get from the database
     * @param {Object} body The express req.body object containing data to input into the database
     * @param {Object} transaction The transaction object
     * @returns {Object} The user object from the database
  */
  static async getUserData(id, { firstName, lastName }, transaction) {
    const data = {};
    if (firstName) data.firstName = firstName;
    if (lastName) data.lastName = lastName;
    if (Object.keys(data).length > 0) {
      const [updateIgnored, updateData] = await Users.update(
        data,
        {
          where: { id },
          returning: true,
          transaction
        }
      );
      return updateData[0].dataValues;
    }
  }
  
  /**
     * It creates users profiles or update them if they exist already
     * @function upsertdata
     * @param {Object} body The express req.body object conotaining form data
     * @param {Object} id The user Id of the owner of the profile
     * @param {Object} departmentId The id of the department the user belongs to
     * @param {Object} transaction The transaction object
     * @returns {Object} The user object just created or updated
  */
  static async upsertData(body, id, departmentId, transaction) {
    const {
      phoneNumber, jobDescription, imageUrl
    } = body;
    
    const [{ dataValues: data }] = await Profiles.upsert(
      {
        userId: id, phoneNumber, departmentId, jobDescription, imageUrl
      },
      {
        returning: true,
        transaction
      }
    );
    
    return data;
  }
  
  /**
     * It allows the super admin to set the role of other users
     * @function updateRole
     * @param {Object} req The express request object
     * @param {Object} res The express response object
     * @returns {Object} express response object
  */
  static async updateRole(req, res) {
    try {
      const { body: { role } } = req;
      const { params: { userId } } = req;
      
      const profile = await Profiles.findOne({
        where: { userId }
      });
      if (!profile) return errorResponse(res, 404, 'User profile does not exist.');
      
      const [rowCountIgnored, { dataValues: data }] = await Profiles.update(
        { role },
        {
          where: { userId },
          returning: true,
        }
      );
      return successResponse(res, 200, 'Profile role updated successfully', data);
    } catch (error) {
      return errorResponse(res, 500, 'Operation not successful. Please try again later.');
    }
  }
}

import RequestService from '../services/requestService';
import {
  getCallbackUrls, messages, status, successResponse, errorResponse,
} from '../utils/index';

import * as services from '../services';
import models from '../models';

const { Requests } = models;

const { baseUrl } = getCallbackUrls;
/**
 * @class RequestController
 * @description Controllers for Request
 * @exports RequestController
 */
export default class RequestController {
  /**
   * @method createRequest
   * @description Method for users to make a request
  * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} response body object
   */
  static async createRequest(req, res) {
    const { userId } = req.user;
    const { departmentId } = req.params;
    const { lineManagerMail } = req.body;
    try {
      const options = { userId, departmentId, lineManagerMail };
      const result = await RequestService.createRequest(options);
      const url = `${baseUrl}/users/tripRequest`;
      await services.sendEmail(lineManagerMail, 'tripRequest', { url });
      return successResponse(res, status.created, messages.requests.success, result);
    } catch (error) {
      return errorResponse(res, status.error, messages.requests.error);
    }
  }
  

  /**
   * @method getAllTripRequests
   * @description Method for users to get all trip requests
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} response body object
   */
  static async getAllTripRequests(req, res) {
    const { userId } = req.user;
    try {
      const request = await RequestService.getAllTripRequests(userId);
      if (request.length > 0) {
        return successResponse(res, status.success, request);
      }
      return errorResponse(res, status.notfound, messages.getRequests.error);
    } catch (error) {
      return errorResponse(res, status.error, messages.authentication.error);
    }
  }

  /**
   * @method getATripRequest
   * @description Method for users to get a single request
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} response body object
   */
  static async getATripRequest(req, res) {
    const { id } = req.params;
    const { userId } = req.user;
    try {
      const result = await RequestService.getATripRequest(id, userId);
      if (!result) {
        return errorResponse(res, status.notfound, messages.getSingleRequests.notFound);
      }
      return successResponse(res, status.success, result);
    } catch (error) {
      return errorResponse(res, status.error, messages.authentication.error);
    }
  }


  /**
   * @method deleteRequest
   * @description Method for users to delete a request
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} response body object
   */
  static async deleteRequest(req, res) {
    const { id } = req.params;
    const { userId } = req.user;
    try {
      const check = await Requests.findOne({ where: { id, userId } });
      if (!check) {
        return errorResponse(res, status.notfound, messages.deleteRequests.notFound);
      }
      if (check.status !== 'pending') {
        return errorResponse(res, status.unprocessable, messages.deleteRequests.access);
      }
      await Requests.destroy({ where: { id, userId } });
      return successResponse(res, status.success, messages.deleteRequests.success);
    } catch (error) {
      return errorResponse(res, status.error, messages.authentication.error);
    }
  }

  /**
   * @method managerGetRequest
   * @description Method for a manager to get requests pertaining to her department
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} response body object
   */
  static async managerGetRequest(req, res) {
    const { departmentId } = req.department;
    if (!req.query.status) {
      const result = await RequestService.managerGetTheRequest(departmentId);
      return successResponse(res, 200, messages.managerRequests.success, result);
    }
    // eslint-disable-next-line no-shadow
    const { status } = req.query;
    try {
      const result = await RequestService.managerGetRequest(departmentId, status);
      if (!result) {
        return errorResponse(res, 404, messages.getRequests.error);
      }
      return successResponse(res, 200, result);
    } catch (error) {
      return errorResponse(res, 500, messages.authentication.error);
    }
  }
}

import TripService from '../services/tripService';
import {
  messages, status, successResponse, errorResponse
} from '../utils/index';
import models from '../models';

const { Requests } = models;

/**
 * @class TripController
 * @description Controllers for Trips
 * @exports TripController
 */
export default class TripController {
  /**
   * @method createTrip
   * @description Method for users to make a trip request
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} response body object
   */
  static async createTrip(req, res) {
    const { requestId } = req.params;
    const {
      origin, destination, departureDate, returnDate,
      travelReasons, typeOfTrip, roomId, accommodationId
    } = req.body;
    const options = {
      requestId,
      origin,
      destination,
      departureDate,
      returnDate,
      travelReasons,
      typeOfTrip,
      roomId,
      accommodationId
    };
    try {
      const result = await TripService.createTrip(options);
      return successResponse(res, status.created, messages.requests.success, result);
    } catch (error) {
      return errorResponse(res, status.error, messages.requests.error);
    }
  }

  /**
   * @method updateTrip
   * @description Method for users to update a trip request
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} response body object
   */
  static async updateTrip(req, res) {
    const { requestId, tripId } = req.params;
    const { userId } = req.user;
    try {
      const {
        origin, destination, departureDate, returnDate,
        travelReasons, typeOfTrip, roomId, accommodationId,
      } = req.body;
      const options = {
        origin, destination, departureDate, returnDate, travelReasons, typeOfTrip, roomId, accommodationId,
      };
      const requests = await Requests.findByPk(requestId);
      if (requests.status !== 'pending') {
        return errorResponse(res, status.unprocessable, messages.updateRequests.access);
      }
      if (requests.userId !== userId) {
        return errorResponse(res, status.unauthorized, messages.updateTrips.unauthorized);
      }
      const result = await TripService.updateTrip(tripId, options);
      return successResponse(res, status.success, messages.updateRequests.success, result);
    } catch (error) {
      return errorResponse(res, status.error, messages.updateRequests.error);
    }
  }
}

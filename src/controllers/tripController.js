import TripService from '../services/tripService';
import {
  messages, status, successResponse, errorResponse
} from '../utils/index';
import formatTrip from '../utils/formatTrip';
import models from '../models';

const { Requests } = models;
const { createMultiTrip, createSingleTrip } = TripService;
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
    const { typeOfTrip, trip: trips } = req.body;
    try {
      if (typeOfTrip === 'Multi-City' && trips.length > 1) {
        const newTrips = trips.map(trip => formatTrip({ ...trip, requestId, typeOfTrip }));

        const result = await createMultiTrip(newTrips);
        return successResponse(res, status.created, messages.requests.success, result);
      }

      if ((typeOfTrip === 'Return' || typeOfTrip === 'One Way') && trips.length === 1) {
        const singleTrip = trips[0];
        const newTrip = formatTrip({ ...singleTrip, requestId, typeOfTrip });
        const result = await createSingleTrip(newTrip);
        return successResponse(res, status.created, messages.requests.success, result);
      }
      const errRes = 'Invalid typeOfTrip or number of trips';
      return errorResponse(res, status.bad, errRes);
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
      const update = formatTrip(req.body);
      const requests = await Requests.findByPk(requestId);
      if (requests.status !== 'pending') {
        return errorResponse(res, status.unprocessable, messages.updateRequests.access);
      }
      await Requests.findOne({ where: { userId } });
      if (requests.userId !== userId) {
        return errorResponse(res, status.unauthorized, messages.updateTrips.unauthorized);
      }
      const result = await TripService.updateTrip(tripId, update);
      return successResponse(res, status.success, messages.updateRequests.success, result);
    } catch (error) {
      return errorResponse(res, status.error, messages.updateRequests.error);
    }
  }
}

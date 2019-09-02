import models from '../models';
import { successResponse, errorResponse } from '../utils';

const { Accommodations, Rooms } = models;

const association = [
  {
    model: Rooms,
    as: 'roomAccommodation',
    attributes: ['id', 'type', 'capacity', 'image']
  }
];

/**
 * @class AccommodationController
 * @description Controllers for handling accommodation requests
 * @exports AccommodationController
 */
class AccommodationController {
  /**
   * @method createAccommodation
   * @description Method to create accommodation facilities
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} Newly created accommodation details
   */
  static async createAccommodation(req, res) {
    const { name, address, image } = req.body;
    try {
      const result = await Accommodations.create({ name, address, image });
      return successResponse(res, 202, 'Accommodation created', result);
    } catch (error) {
      return errorResponse(res, 500, 'Error creating accommodation');
    }
  }

  /**
   * @method getAllAccommodation
   * @description Method to create accommodation facilities
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} All accommodation details
   */
  static async getAccommodation(req, res) {
    try {
      const result = await Accommodations.findAll({
        include: association
      });
      return successResponse(res, 200, 'All Accommodations', result);
    } catch (error) {
      return errorResponse(res, 500, 'Error getting accommodations');
    }
  }

  /**
   * @method getAccommodationById
   * @description Method to get accommodation facilities
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} All accommodation details
   */
  static async getAccommodationById(req, res) {
    const { accommodationId } = req.params;
    try {
      const result = await Accommodations.findByPk(accommodationId, {
        include: association
      });
      if (!result) {
        return errorResponse(res, 404, 'Accommodation not found');
      }
      return successResponse(res, 200, 'All Accommodations', result);
    } catch (error) {
      return errorResponse(res, 500, 'Error getting accommodations');
    }
  }

  /**
    * @method updateAccommodation
    * @description Method to update accommodation facilities
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @returns {object} Update accommodations details
    */
  static async updateAccommodation(req, res) {
    const { accommodationId } = req.params;
    const { name, address, image } = req.body;
    try {
      const checkAccommodation = await Accommodations.findByPk(accommodationId);
      if (!checkAccommodation) {
        return errorResponse(res, 404, 'Accommodation not found');
      }
      await Accommodations.update({ name, address, image },
        { where: { id: accommodationId } });
      return successResponse(res, 200, 'Accommodation updated');
    } catch (error) {
      return errorResponse(res, 500, 'Error updating accommodations');
    }
  }

  /**
    * @method deleteAccommodations
    * @description Method to delete accommodations
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @returns {string} Accommodation status
    */
  static async deleteAccommodation(req, res) {
    const { accommodationId } = req.params;
    try {
      const checkAccommodation = await Accommodations.findOne({
        where: { id: accommodationId }
      });
      if (!checkAccommodation) {
        return errorResponse(res, 404, 'Accommodation not found');
      }
      await Accommodations.destroy({ where: { id: accommodationId } });
      return successResponse(res, 200, 'Accommodation deleted');
    } catch (error) {
      return errorResponse(res, 500, 'Error deleting accommodation');
    }
  }
}

export default AccommodationController;

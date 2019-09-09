import models from '../models';
import { successResponse, errorResponse } from '../utils';

const { Rooms, Accommodations } = models;
/**
 * @class RoomsController
 * @description Controllers for handling rooms requests
 * @exports AccommodationController
 */
class RoomController {
  /**
    * @method createRooms
    * @description Method to create room facilities
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @returns {object} Newly created room details
    */
  static async createRoom(req, res) {
    const { accommodationId } = req.params;
    const { type, capacity, image } = req.body;
    try {
      const checkAccommodation = await Accommodations.findOne({
        where: { id: accommodationId }
      });
      if (!checkAccommodation) {
        return errorResponse(res, 404, 'Accommodation does not exist');
      }
      const result = await Rooms.create({
        type, capacity, image, accommodationId
      });
      return successResponse(res, 202, 'Room created', result);
    } catch (error) {
      return errorResponse(res, 500, 'Error creating room');
    }
  }

  /**
    * @method updateRoom
    * @description Method to update room facilities
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @returns {object} Update room details
    */
  static async updateRoom(req, res) {
    const { params: { roomId } } = req;
    const { type, capacity, image } = req.body;
    try {
      const checkRoom = await Rooms.findOne({ where: { id: roomId } });
      if (!checkRoom) {
        return errorResponse(res, 404, 'Room not found');
      }
      await Rooms.update({
        type, capacity, image
      }, { where: { id: roomId } });
      return successResponse(res, 200, 'Room updated');
    } catch (error) {
      console.log(error);
      return errorResponse(res, 500, 'Error updating room');
    }
  }

  /**
    * @method deleteRoom
    * @description Method to delete rooms
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @returns {string} Room status
    */
  static async deleteRoom(req, res) {
    const { roomId } = req.params;
    try {
      const checkRoom = await Rooms.findByPk(roomId);
      if (!checkRoom) {
        return errorResponse(res, 404, 'Room not found');
      }
      await Rooms.destroy({ where: { id: roomId } });
      return successResponse(res, 200, 'Room deleted');
    } catch (error) {
      console.log(error);
      return errorResponse(res, 500, 'Error deleting room');
    }
  }

  /**
   * @method getSingleRoom
   * @description Method to get single rooms
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} Room object
   */
  static async getRoomById(req, res) {
    try {
      const { roomId } = req.params;
      const result = await Rooms.findByPk(roomId);
      if (!result) {
        return errorResponse(res, 404, 'Room not found');
      }
      return successResponse(res, 200, 'Room fetched', result);
    } catch (error) {
      errorResponse(res, 500, 'Error fetching room');
    }
  }

  /**
   * @method getRoomByAccommodation
   * @description Method to get all rooms for an accommodation
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} Room object
   */
  static async getRoomByAccommodation(req, res) {
    try {
      const { params: { accommodationId } } = req;
      const checkAccommodation = await Accommodations.findOne({ where: { id: accommodationId } });
      if (!checkAccommodation) {
        return errorResponse(res, 404, 'Accommodation not found');
      }
      const result = await Rooms.findAll({ where: { accommodationId } });
      return successResponse(res, 200, 'Rooms fetched', result);
    } catch (error) {
      errorResponse(res, 500, 'Error fetching room');
    }
  }
}

export default RoomController;

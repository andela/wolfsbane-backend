import models from '../models';


const { Trips, Requests } = models;


const reqAssociation = [
  {
    model: Trips,
    as: 'requestTrips',
    attributes: ['origin', 'destination', 'departureDate', 'returnDate', 'travelReasons',
      'typeOfTrip', 'roomId', 'accommodationId']
  },
];

const RequestService = {
  async createRequest(options) {
    const createrequest = Requests.create(
      options
    );
    return createrequest;
  },

  async getAllTripRequests(userId) {
    const getTripReq = await Requests.findAll({ where: { userId }, include: reqAssociation });
    return getTripReq;
  },

  async getATripRequest(id) {
    const getATripReq = await Requests.findByPk(id, { include: reqAssociation });
    return getATripReq;
  },

  async managerGetRequest(departmentId, status) {
    const getTripReq = await Requests.findAll({
      where: {
        departmentId,
        status
      },
      include: reqAssociation
    });
    return getTripReq;
  },

  async managerGetTheRequest(departmentId) {
    const getTripReq = await Requests.findAll({
      where: {
        departmentId,
      },
      include: reqAssociation
    });
    return getTripReq;
  },
};

export default RequestService;

import models from '../models';

const { Trips } = models;

const TripService = {
  async createSingleTrip(newTrip) {
    const createtrip = await Trips.create(newTrip);
    return createtrip;
  },
  async createMultiTrip(newTrips) {
    const createtrip = await Trips.bulkCreate(newTrips);
    return createtrip;
  },
  async updateTrip(tripId, options) {
    await Trips.findOne({ where: { id: tripId } });
    await Trips.update(options, { where: { id: tripId } });
    return options;
  }
};

export default TripService;

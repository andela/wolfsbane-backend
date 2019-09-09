import models from '../models';

const { Trips } = models;

const TripService = {
  async createTrip(options) {
    const createTrip = await Trips.create(options);
    return createTrip;
  },

  async updateTrip(tripId, options) {
    await Trips.findOne({ where: { id: tripId } });
    await Trips.update(options, { where: { id: tripId } });
    return options;
  }
};
export default TripService;

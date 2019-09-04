import {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} from 'sequelize-test-helpers';

import TripModel from '../../models/Trip';

describe('Test for Trip Model', () => {
  const Trip = TripModel(sequelize, dataTypes);
  const trip = new Trip();

  checkModelName(Trip)('Trips');

  context('properties', () => {
    ['origin', 'destination', 'departureDate', 'returnDate', 'travelReasons'].forEach(checkPropertyExists(trip));
  });
});

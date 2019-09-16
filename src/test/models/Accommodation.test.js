import { expect } from 'chai';
import {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} from 'sequelize-test-helpers';

import AccommodationModel from '../../models/Accommodation';

describe('Test for Accommodation Model', () => {
  const Accommodation = AccommodationModel(sequelize, dataTypes);
  const accommodation = new Accommodation();

  checkModelName(Accommodation)('Accommodations');

  context('properties', () => {
    ['name', 'address', 'image'].forEach(checkPropertyExists(accommodation));
  });


  context('associations', () => {
    const Rooms = 'The rooms an accommodation offers';
    const Trips = 'The request for a trip accommodation';
    const Reaction = 'The reaction to an accomodation facility';

    before(() => {
      Accommodation.associate({ Rooms });
      Accommodation.associate({ Trips });
      Accommodation.associate({ Reaction });
    });

    it('defined a hasMany association with Trips', () => {
      expect(Accommodation.hasMany).to.have.been.calledWith(Trips, {
        as: 'tripAccommodation',
        foreignKey: 'accommodationId',
        onDelete: 'cascade',
        hooks: true
      });
    });


    it('defined a hasMany association with Rooms', () => {
      expect(Accommodation.hasMany).to.have.been.calledWith(Rooms, {
        as: 'roomAccommodation',
        foreignKey: 'accommodationId',
        onDelete: 'cascade',
        hooks: true
      });
    });

    it('defined a hasMany association with Reactions', () => {
      expect(Accommodation.hasMany).to.have.been.calledWith(Reaction, {
        as: 'accommodationReaction',
        foreignKey: 'accommodationId',
        onDelete: 'cascade',
        hooks: true
      });
    });
  });
});

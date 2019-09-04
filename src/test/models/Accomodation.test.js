import { expect } from 'chai';
import {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} from 'sequelize-test-helpers';

import AccomodationModel from '../../models/Accomodation';

describe('Test for Accomodation Model', () => {
  const Accomodation = AccomodationModel(sequelize, dataTypes);
  const accomodation = new Accomodation();

  checkModelName(Accomodation)('Accomodations');

  context('properties', () => {
    ['name', 'address', 'image'].forEach(checkPropertyExists(accomodation));
  });


  context('associations', () => {
    const Rooms = 'The rooms an accomodation offers';
    const Requests = 'The request for an an accomodation';

    before(() => {
      Accomodation.associate({ Rooms });
      Accomodation.associate({ Requests });
    });

    it('defined a hasMany association with Requests', () => {
      expect(Accomodation.hasMany).to.have.been.calledWith(Requests, { as: 'requestAccomodation', foreignKey: 'accomodationId' });
    });

    it('defined a hasMany association with Rooms', () => {
      expect(Accomodation.hasMany).to.have.been.calledWith(Rooms, { as: 'roomAccomodation', foreignKey: 'accomodationId' });
    });
  });
});

import { expect } from 'chai';
import {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} from 'sequelize-test-helpers';

import RequestModel from '../../models/Request';

describe('Test for Request Model', () => {
  const Request = RequestModel(sequelize, dataTypes);
  const request = new Request();

  checkModelName(Request)('Requests');

  context('properties', () => {
    ['status'].forEach(checkPropertyExists(request));
  });


  context('associations', () => {
    const Comments = 'The comments a request has';
    const Users = 'The user that makes a request';
    const Trips = 'The trips a request has';


    before(() => {
      Request.associate({ Comments });
      Request.associate({ Users });
      Request.associate({ Trips });
    });

    it('defined a hasMany association with Comments', () => {
      expect(Request.hasMany).to.have.been.calledWith(Comments, { as: 'requestComments', foreignKey: 'reqId' });
    });

    it('defined a hasMany association with Trips', () => {
      expect(Request.hasMany).to.have.been.calledWith(Trips, { as: 'requestTrips', foreignKey: 'reqId' });
    });
  });
});

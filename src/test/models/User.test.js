
import chai from 'chai';
import {
  sequelize, dataTypes, checkModelName, checkPropertyExists
} from 'sequelize-test-helpers';

import UserModel from '../../models/User';

const { expect } = chai;
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

describe('Test for User Model', () => {
  const User = UserModel(sequelize, dataTypes);
  const users = new User();

  checkModelName(User)('Users');

  context('properties', () => {
    ['firstName', 'lastName', 'email', 'password', 'isVerified'].forEach(checkPropertyExists(users));
  });
  context('associations', () => {
    const Profiles = 'the user profile';
    const Requests = 'the user that makes a request';

    before(() => {
      User.associate({ Profiles });
      User.associate({ Requests });
    });

    it('defined a hasOne association with Profile', () => {
      expect(User.hasOne).to.have.been.calledWith(Profiles);
    });

    it('defined a hasMany association with Requests', () => {
      expect(User.hasMany).to.have.been.calledWith(Requests, { as: 'userRequests', foreignKey: 'userId' });
    });
  });
});

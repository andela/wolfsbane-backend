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

  checkModelName(User)('users');

  context('properties', () => {
    ['firstName', 'lastName', 'email', 'password'].forEach(checkPropertyExists(users));
  });
  context('associations', () => {
    const profiles = 'the user profile';

    before(() => {
      User.associate({ profiles });
    });

    it('defined a hasOne association with Profile', () => {
      expect(User.hasOne).to.have.been.calledWith(profiles);
    });
  });
});

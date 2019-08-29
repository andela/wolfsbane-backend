import chai from 'chai';
import {
  sequelize, dataTypes, checkModelName, checkPropertyExists
} from 'sequelize-test-helpers';

import ProfileModel from '../../models/Profile';

const { expect } = chai;
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

describe('Test for Profile Model', () => {
  const Profile = ProfileModel(sequelize, dataTypes);
  const profiles = new Profile();

  checkModelName(Profile)('profiles');

  context('properties', () => {
    ['userId', 'phoneNumber', 'departmentId', 'role', 'jobDescription', 'imageUrl', 'isVerified'].forEach(
      checkPropertyExists(profiles)
    );
  });
  context('associations', () => {
    const departments = 'the department the user profile belongs to';

    before(() => {
      Profile.associate({ departments });
    });

    it('defined a belongsTo association with Department', () => {
      expect(Profile.belongsTo).to.have.been.calledWith(departments);
    });
  });
});

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

  checkModelName(Profile)('Profiles');

  context('properties', () => {
    ['userId', 'phoneNumber', 'departmentId', 'role', 'jobDescription', 'imageUrl'].forEach(
      checkPropertyExists(profiles)
    );
  });
  context('associations', () => {
    const Departments = 'the department the user profile belongs to';

    before(() => {
      Profile.associate({ Departments });
    });

    it('defined a belongsTo association with Department', () => {
      expect(Profile.belongsTo).to.have.been.calledWith(Departments);
    });
  });
});

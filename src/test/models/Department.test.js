import {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} from 'sequelize-test-helpers';

import DepartmentModel from '../../models/Department';

describe('Test for Department Model', () => {
  const Department = DepartmentModel(sequelize, dataTypes);
  const department = new Department();

  checkModelName(Department)('departments');

  context('properties', () => {
    ['name'].forEach(checkPropertyExists(department));
  });
});

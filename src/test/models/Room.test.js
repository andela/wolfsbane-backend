import {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} from 'sequelize-test-helpers';

import RoomModel from '../../models/Room';

describe('Test for Room Model', () => {
  const Room = RoomModel(sequelize, dataTypes);
  const room = new Room();

  checkModelName(Room)('Rooms');

  context('properties', () => {
    ['type', 'capacity', 'image'].forEach(checkPropertyExists(room));
  });
});

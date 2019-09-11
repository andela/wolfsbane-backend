import {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} from 'sequelize-test-helpers';

import ReactionModel from '../../models/Reaction';

describe('Test for Reaction model', () => {
  const Reaction = ReactionModel(sequelize, dataTypes);
  const reaction = new Reaction();

  checkModelName(Reaction)('Reaction');

  context('properties', () => {
    ['reaction'].forEach(checkPropertyExists(reaction));
  });
});

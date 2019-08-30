import {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} from 'sequelize-test-helpers';

import CommentModel from '../../models/Comment';

describe('Test for Comment Model', () => {
  const Comment = CommentModel(sequelize, dataTypes);
  const comment = new Comment();

  checkModelName(Comment)('Comments');

  context('properties', () => {
    ['comment'].forEach(checkPropertyExists(comment));
  });
});

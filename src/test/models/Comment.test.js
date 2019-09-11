import { expect } from 'chai';
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

  context('associations', () => {
    const Users = 'The owner of the Comment';

    before(() => {
      Comment.associate({ Users });
    });

    it('defined a belongsTo association with Users', () => {
      expect(Comment.belongsTo).to.have.been.calledWith(Users);
    });
  });
});

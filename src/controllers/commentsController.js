import models from '../models';
import { successResponse, errorResponse, status } from '../utils';

const { Comments, Requests, Users } = models;

const association = [
  {
    model: Users,
    as: 'theUser',
    attributes: ['id', 'firstName', 'lastName', 'email']
  }
];

/**
 * @class CommentsController
 * @description Controllers for handling travel requests comments
 * @exports CommentsController
 */
class CommentsController {
  /**
   * @method addComment
   * @description Method to add comment to requests
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} Newly added request comment
   */
  static async addComment(req, res) {
    const { userId } = req.user;
    const { requestId } = req.params;
    const { comment } = req.body;
    try {
      const existingRequest = await Requests.findOne({
        where: { id: requestId }
      });
      if (!existingRequest) {
        return errorResponse(res, status.notfound, 'Request does not exist');
      }
      const commentAdded = await Comments.create({ comment, userId, requestId });
      const response = commentAdded.toJSON();
      return successResponse(res, status.created, 'Comment added successfully', response);
    } catch (error) {
      return errorResponse(res, status.error, 'Error adding comment');
    }
  }

  /**
   * @method getSingleComment
   * @description Method to get a comment
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object}  retrieved comment details
   */
  static async getCommentById(req, res) {
    const { commentId } = req.params;
    try {
      const getComment = await Comments.findOne({ where: { id: commentId }, include: association });
      if (!getComment) {
        return errorResponse(res, status.notfound, 'Comment not found');
      }
      const response = getComment.toJSON();
      return successResponse(res, status.success, 'Comment retrieved successfully', response);
    } catch (error) {
      return errorResponse(res, status.error, 'Error retrieving comment');
    }
  }

  /**
   * @method updateComment
   * @description Method to update comment
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} updated comment details
   */
  static async updateCommentById(req, res) {
    const { commentId } = req.params;
    const { comment } = req.body;
    try {
      const getComment = await Comments.findOne({ where: { id: commentId } });
      if (!getComment) {
        return errorResponse(res, status.notfound, 'Comment not found');
      }
      await Comments.update({ comment }, { where: { id: commentId } });
      return successResponse(res, status.success, 'Comment updated successfully');
    } catch (error) {
      return errorResponse(res, status.error, 'Error updating comment');
    }
  }

  /**
   * @method deleteComment
   * @description Method to delete comment
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} deleted comment details
   */
  static async deleteCommentById(req, res) {
    const { commentId } = req.params;
    try {
      const getComment = await Comments.findByPk(commentId);
      if (!getComment) {
        return errorResponse(res, status.notfound, 'Comment not found');
      }
      await Comments.destroy({ where: { id: commentId } });
      return successResponse(res, status.success, 'Comment deleted successfully');
    } catch (error) {
      return errorResponse(res, status.error, 'Error deleting comment');
    }
  }

  /**
   * @method getAllCommentsOnRequest
   * @description Method to get all comments on requests
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object}  retrieved comments details
   */
  static async getAllCommentsOnRequest(req, res) {
    const { requestId } = req.params;
    try {
      const existingRequest = await Requests.findOne({ where: { id: requestId } });
      if (!existingRequest) {
        return errorResponse(res, status.notfound, 'Request not found');
      }
      const response = await Comments.findAll({ where: { requestId }, include: association });
      return successResponse(res, status.success, 'Comments retrieved successfully', response);
    } catch (error) {
      return errorResponse(res, status.error, 'Error retrieving comments');
    }
  }
}

export default CommentsController;

const commentService = require('../services/CommentService');
const { successResponse } = require('../utils/response');

class CommentController {
  async addComment(req, res, next) {
    try {
      const commentData = { ...req.body, userId: req.user._id };
      const comment = await commentService.addComment(commentData);
      return successResponse(res, 201, 'Comment added successfully', comment);
    } catch (error) {
      next(error);
    }
  }

  async getCommentsByArticleId(req, res, next) {
    try {
      const comments = await commentService.getCommentsByArticleId(req.params.articleId);
      return successResponse(res, 200, 'Comments retrieved', comments);
    } catch (error) {
      next(error);
    }
  }

  async deleteComment(req, res, next) {
    try {
      await commentService.deleteComment(req.params.id, req.user._id);
      return successResponse(res, 200, 'Comment deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CommentController();

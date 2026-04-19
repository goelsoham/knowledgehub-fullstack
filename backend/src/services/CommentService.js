const commentRepository = require('../repositories/CommentRepository');

class CommentService {
  async addComment(commentData) {
    return await commentRepository.create(commentData);
  }

  async getCommentsByArticleId(articleId) {
    return await commentRepository.findByArticleId(articleId);
  }

  async deleteComment(id, userId) {
    const comment = await commentRepository.findById(id);
    if (!comment) {
      const error = new Error('Comment not found');
      error.statusCode = 404;
      throw error;
    }
    if (comment.userId.toString() !== userId.toString()) {
      const error = new Error('Not authorized to delete this comment');
      error.statusCode = 403;
      throw error;
    }
    return await commentRepository.deleteById(id);
  }
}

module.exports = new CommentService();

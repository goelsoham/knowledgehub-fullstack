const userRepository = require('./UserRepository');

const comments = [];

class CommentRepository {
  async create(commentData) {
    const newComment = {
      _id: Date.now().toString(),
      articleId: commentData.articleId,
      userId: commentData.userId,
      content: commentData.content.trim(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    comments.push(newComment);
    return newComment;
  }

  async findByArticleId(articleId) {
    const articleComments = comments.filter(c => c.articleId === articleId);
    articleComments.sort((a, b) => b.createdAt - a.createdAt);
    
    return articleComments.map(c => {
      const populated = { ...c };
      const rawUser = userRepository.getRawUserById(c.userId);
      if (rawUser) {
        populated.userId = {
          _id: rawUser._id,
          name: rawUser.name
        };
      }
      return populated;
    });
  }

  async deleteById(id) {
    const index = comments.findIndex(c => c._id === id);
    if (index === -1) return null;
    return comments.splice(index, 1)[0];
  }

  async findById(id) {
    return comments.find(c => c._id === id) || null;
  }
}

module.exports = new CommentRepository();

const userRepository = require('../repositories/UserRepository');
const articleRepository = require('../repositories/ArticleRepository');

class AdminService {
  async getAllUsers() {
    return await userRepository.findAll();
  }

  async deleteUser(userId) {
    const user = await userRepository.findById(userId);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    if (user.role === 'admin') {
      const error = new Error('Cannot delete an admin user');
      error.statusCode = 403;
      throw error;
    }
    return await userRepository.deleteById(userId);
  }

  async getPendingArticles() {
    return await articleRepository.findAll({ status: 'pending' });
  }

  async approveArticle(articleId) {
    return await articleRepository.updateById(articleId, { status: 'approved' });
  }

  async rejectArticle(articleId) {
    return await articleRepository.updateById(articleId, { status: 'rejected' });
  }
}

module.exports = new AdminService();

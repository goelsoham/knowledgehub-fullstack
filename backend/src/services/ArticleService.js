const articleRepository = require('../repositories/ArticleRepository');
const editHistoryRepository = require('../repositories/EditHistoryRepository');

class ArticleService {
  async createArticle(articleData) {
    return await articleRepository.create(articleData);
  }

  async getArticles(query, limit, skip) {
    return await articleRepository.findAll(query, limit, skip);
  }

  async getArticleById(id) {
    const article = await articleRepository.findById(id);
    if (!article) {
      const error = new Error('Article not found');
      error.statusCode = 404;
      throw error;
    }
    article.views += 1;
    await article.save();
    return article;
  }

  async updateArticle(id, userId, updateData) {
    const article = await articleRepository.findById(id);
    if (!article) {
      const error = new Error('Article not found');
      error.statusCode = 404;
      throw error;
    }
    if (article.authorId._id.toString() !== userId.toString()) {
      const error = new Error('Not authorized to update this article');
      error.statusCode = 403;
      throw error;
    }
    
    await editHistoryRepository.create({
      articleId: id,
      editedBy: userId,
      previousContent: article.content,
      updatedContent: updateData.content || article.content
    });

    updateData.status = 'pending';
    return await articleRepository.updateById(id, updateData);
  }

  async deleteArticle(id, userId) {
    const article = await articleRepository.findById(id);
    if (!article) {
      const error = new Error('Article not found');
      error.statusCode = 404;
      throw error;
    }
    if (article.authorId._id.toString() !== userId.toString()) {
      const error = new Error('Not authorized to delete this article');
      error.statusCode = 403;
      throw error;
    }
    return await articleRepository.deleteById(id);
  }

  async searchArticles(keyword) {
    const query = {
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { summary: { $regex: keyword, $options: 'i' } },
        { tags: { $in: [new RegExp(keyword, 'i')] } }
      ],
      status: 'approved'
    };
    return await articleRepository.findAll(query);
  }

  async getArticlesByCategory(categoryId) {
    return await articleRepository.findAll({ categoryId, status: 'approved' });
  }

  async getTrendingArticles() {
    return await articleRepository.findAll({ status: 'approved' }, 10, 0, { views: -1, likes: -1 });
  }
}

module.exports = new ArticleService();

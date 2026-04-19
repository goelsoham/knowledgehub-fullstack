const articleService = require('../services/ArticleService');
const { successResponse } = require('../utils/response');

class ArticleController {
  async createArticle(req, res, next) {
    try {
      const articleData = { ...req.body, authorId: req.user._id };
      const article = await articleService.createArticle(articleData);
      return successResponse(res, 201, 'Article created successfully', article);
    } catch (error) {
      next(error);
    }
  }

  async getArticles(req, res, next) {
    try {
      const query = { status: 'approved' };
      const limit = parseInt(req.query.limit) || 10;
      const skip = parseInt(req.query.skip) || 0;
      const articles = await articleService.getArticles(query, limit, skip);
      return successResponse(res, 200, 'Articles retrieved', articles);
    } catch (error) {
      next(error);
    }
  }

  async getArticleById(req, res, next) {
    try {
      const article = await articleService.getArticleById(req.params.id);
      return successResponse(res, 200, 'Article retrieved', article);
    } catch (error) {
      next(error);
    }
  }

  async updateArticle(req, res, next) {
    try {
      const article = await articleService.updateArticle(req.params.id, req.user._id, req.body);
      return successResponse(res, 200, 'Article updated successfully', article);
    } catch (error) {
      next(error);
    }
  }

  async deleteArticle(req, res, next) {
    try {
      await articleService.deleteArticle(req.params.id, req.user._id);
      return successResponse(res, 200, 'Article deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  async searchArticles(req, res, next) {
    try {
      const { q } = req.query;
      const articles = await articleService.searchArticles(q || '');
      return successResponse(res, 200, 'Search results retrieved', articles);
    } catch (error) {
      next(error);
    }
  }

  async getArticlesByCategory(req, res, next) {
    try {
      const articles = await articleService.getArticlesByCategory(req.params.categoryId);
      return successResponse(res, 200, 'Category articles retrieved', articles);
    } catch (error) {
      next(error);
    }
  }

  async getTrendingArticles(req, res, next) {
    try {
      const articles = await articleService.getTrendingArticles();
      return successResponse(res, 200, 'Trending articles retrieved', articles);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ArticleController();

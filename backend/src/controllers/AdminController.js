const adminService = require('../services/AdminService');
const { successResponse } = require('../utils/response');

class AdminController {
  async getAllUsers(req, res, next) {
    try {
      const users = await adminService.getAllUsers();
      return successResponse(res, 200, 'Users retrieved successfully', users);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      await adminService.deleteUser(req.params.id);
      return successResponse(res, 200, 'User deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  async getPendingArticles(req, res, next) {
    try {
      const articles = await adminService.getPendingArticles();
      return successResponse(res, 200, 'Pending articles retrieved successfully', articles);
    } catch (error) {
      next(error);
    }
  }

  async approveArticle(req, res, next) {
    try {
      const article = await adminService.approveArticle(req.params.id);
      return successResponse(res, 200, 'Article approved successfully', article);
    } catch (error) {
      next(error);
    }
  }

  async rejectArticle(req, res, next) {
    try {
      const article = await adminService.rejectArticle(req.params.id);
      return successResponse(res, 200, 'Article rejected successfully', article);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AdminController();

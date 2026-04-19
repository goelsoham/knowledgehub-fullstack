const bookmarkService = require('../services/BookmarkService');
const { successResponse } = require('../utils/response');

class BookmarkController {
  async addBookmark(req, res, next) {
    try {
      const bookmark = await bookmarkService.addBookmark(req.user._id, req.body.articleId);
      return successResponse(res, 201, 'Bookmark added successfully', bookmark);
    } catch (error) {
      next(error);
    }
  }

  async removeBookmark(req, res, next) {
    try {
      await bookmarkService.removeBookmark(req.params.id, req.user._id);
      return successResponse(res, 200, 'Bookmark removed successfully');
    } catch (error) {
      next(error);
    }
  }

  async getUserBookmarks(req, res, next) {
    try {
      const bookmarks = await bookmarkService.getUserBookmarks(req.params.userId);
      return successResponse(res, 200, 'User bookmarks retrieved', bookmarks);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BookmarkController();

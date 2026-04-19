const bookmarkRepository = require('../repositories/BookmarkRepository');

class BookmarkService {
  async addBookmark(userId, articleId) {
    return await bookmarkRepository.create({ userId, articleId });
  }

  async removeBookmark(id, userId) {
    const bookmark = await bookmarkRepository.findById(id);
    if (!bookmark) {
      const error = new Error('Bookmark not found');
      error.statusCode = 404;
      throw error;
    }
    if (bookmark.userId.toString() !== userId.toString()) {
      const error = new Error('Not authorized to remove this bookmark');
      error.statusCode = 403;
      throw error;
    }
    return await bookmarkRepository.deleteById(id);
  }

  async getUserBookmarks(userId) {
    return await bookmarkRepository.findByUserId(userId);
  }
}

module.exports = new BookmarkService();

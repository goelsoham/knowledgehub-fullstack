const articleRepository = require('./ArticleRepository');

const bookmarks = [];

class BookmarkRepository {
  async create(bookmarkData) {
    const newBookmark = {
      _id: Date.now().toString(),
      userId: bookmarkData.userId,
      articleId: bookmarkData.articleId,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    bookmarks.push(newBookmark);
    return newBookmark;
  }

  async findByUserId(userId) {
    const userBookmarks = bookmarks.filter(b => b.userId === userId);
    
    const populatedBookmarks = [];
    for (const b of userBookmarks) {
      const populated = { ...b };
      const rawArticle = await articleRepository.findById(b.articleId);
      if (rawArticle) {
        populated.articleId = rawArticle;
      }
      populatedBookmarks.push(populated);
    }
    
    return populatedBookmarks;
  }

  async deleteById(id) {
    const index = bookmarks.findIndex(b => b._id === id);
    if (index === -1) return null;
    return bookmarks.splice(index, 1)[0];
  }

  async findById(id) {
    return bookmarks.find(b => b._id === id) || null;
  }
}

module.exports = new BookmarkRepository();

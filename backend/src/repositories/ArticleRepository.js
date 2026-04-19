const userRepository = require('./UserRepository');
const categoryRepository = require('./CategoryRepository');

const articles = [];

class ArticleRepository {
  async create(articleData) {
    const newArticle = {
      _id: Date.now().toString(),
      title: articleData.title.trim(),
      summary: articleData.summary,
      content: articleData.content,
      slug: articleData.slug || articleData.title.toLowerCase().replace(/ /g, '-'),
      authorId: articleData.authorId,
      categoryId: articleData.categoryId,
      tags: articleData.tags || [],
      status: articleData.status || 'draft',
      views: 0,
      likes: 0,
      dislikes: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    articles.push(newArticle);
    return this._populate(newArticle);
  }

  async findById(id) {
    const article = articles.find(a => a._id === id);
    if (!article) return null;
    return this._populate(article);
  }

  async findAll(query = {}, limit = 10, skip = 0, sort = { createdAt: -1 }) {
    let result = articles.filter(article => {
      let isMatch = true;
      if (query.status && article.status !== query.status) isMatch = false;
      if (query.categoryId && article.categoryId !== query.categoryId) isMatch = false;
      if (query.$or) {
        let orMatch = false;
        query.$or.forEach(cond => {
          if (cond.title && cond.title.$regex && article.title.match(cond.title.$regex)) orMatch = true;
          if (cond.summary && cond.summary.$regex && article.summary.match(cond.summary.$regex)) orMatch = true;
          if (cond.tags && cond.tags.$in) {
            article.tags.forEach(tag => {
              cond.tags.$in.forEach(regex => {
                if (tag.match(regex)) orMatch = true;
              });
            });
          }
        });
        if (!orMatch) isMatch = false;
      }
      return isMatch;
    });

    if (sort.views || sort.likes) {
      result.sort((a, b) => {
        if (sort.views === -1) return b.views - a.views;
        if (sort.likes === -1) return b.likes - a.likes;
        return 0;
      });
    } else {
      result.sort((a, b) => b.createdAt - a.createdAt);
    }

    const paginated = result.slice(skip, skip + limit);
    return paginated.map(a => this._populate(a));
  }

  async updateById(id, updateData) {
    const index = articles.findIndex(a => a._id === id);
    if (index === -1) return null;
    
    articles[index] = {
      ...articles[index],
      ...updateData,
      updatedAt: new Date()
    };
    
    return this._populate(articles[index]);
  }

  async deleteById(id) {
    const index = articles.findIndex(a => a._id === id);
    if (index === -1) return null;
    return articles.splice(index, 1)[0];
  }

  _populate(article) {
    const populated = { ...article };
    const rawAuthor = userRepository.getRawUserById(article.authorId);
    if (rawAuthor) {
      populated.authorId = {
        _id: rawAuthor._id,
        name: rawAuthor.name,
        email: rawAuthor.email
      };
    }
    const rawCategory = categoryRepository.getRawCategoryById(article.categoryId);
    if (rawCategory) {
      populated.categoryId = {
        _id: rawCategory._id,
        name: rawCategory.name
      };
    }
    return populated;
  }
}

module.exports = new ArticleRepository();

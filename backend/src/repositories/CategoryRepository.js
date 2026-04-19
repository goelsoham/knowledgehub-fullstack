const categories = [];

class CategoryRepository {
  async create(categoryData) {
    const newCategory = {
      _id: Date.now().toString(),
      name: categoryData.name.trim(),
      description: categoryData.description || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    categories.push(newCategory);
    return newCategory;
  }

  async findById(id) {
    return categories.find(c => c._id === id) || null;
  }

  async findAll() {
    return [...categories];
  }

  getRawCategoryById(id) {
    return categories.find(c => c._id === id);
  }
}

module.exports = new CategoryRepository();

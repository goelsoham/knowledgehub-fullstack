const userRepository = require('./UserRepository');

const editHistories = [];

class EditHistoryRepository {
  async create(historyData) {
    const newHistory = {
      _id: Date.now().toString(),
      articleId: historyData.articleId,
      editedBy: historyData.editedBy,
      previousContent: historyData.previousContent,
      updatedContent: historyData.updatedContent,
      editedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    editHistories.push(newHistory);
    return newHistory;
  }

  async findByArticleId(articleId) {
    const histories = editHistories.filter(h => h.articleId === articleId);
    
    histories.sort((a, b) => b.editedAt - a.editedAt);
    
    return histories.map(h => {
      const populated = { ...h };
      const rawUser = userRepository.getRawUserById(h.editedBy);
      if (rawUser) {
        populated.editedBy = {
          _id: rawUser._id,
          name: rawUser.name
        };
      }
      return populated;
    });
  }
}

module.exports = new EditHistoryRepository();

const bcrypt = require('bcryptjs');

const users = [];

class UserRepository {
  async create(userData) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    
    const newUser = {
      _id: Date.now().toString(),
      name: userData.name,
      email: userData.email.toLowerCase().trim(),
      password: hashedPassword,
      role: userData.role || 'reader',
      bio: userData.bio || '',
      profileImage: userData.profileImage || '',
      bookmarkedArticles: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    users.push(newUser);
    return newUser;
  }

  async findByEmail(email) {
    return users.find(u => u.email === email.toLowerCase().trim());
  }

  async findById(id) {
    const user = users.find(u => u._id === id);
    if (!user) return null;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findAll() {
    return users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);
  }

  async deleteById(id) {
    const index = users.findIndex(u => u._id === id);
    if (index === -1) return null;
    const deletedUser = users.splice(index, 1)[0];
    const { password, ...userWithoutPassword } = deletedUser;
    return userWithoutPassword;
  }

  getRawUserById(id) {
    return users.find(u => u._id === id);
  }
}

module.exports = new UserRepository();

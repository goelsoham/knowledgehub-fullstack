const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils/response');
const userRepository = require('../repositories/UserRepository');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      const user = await userRepository.findById(decoded.id);
      
      if (!user) {
        return errorResponse(res, 401, 'Not authorized, user not found');
      }
      const { password, ...userWithoutPassword } = user;
      req.user = userWithoutPassword;
      
      next();
    } catch (error) {
      return errorResponse(res, 401, 'Not authorized, token failed');
    }
  }

  if (!token) {
    return errorResponse(res, 401, 'Not authorized, no token');
  }
};

module.exports = { protect };

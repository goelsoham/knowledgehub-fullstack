const { errorResponse } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  console.error(err);

  return errorResponse(res, statusCode, message, err.errors || []);
};

module.exports = errorHandler;

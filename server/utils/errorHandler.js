/**
 * Custom error handler for API responses
 * @param {Error} err - The error object
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code (default: 500)
 */
const handleError = (err, res, statusCode = 500) => {
  console.error(err.stack);
  
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Server Error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

module.exports = { handleError };

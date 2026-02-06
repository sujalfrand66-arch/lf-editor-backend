const multer = require('multer');

// Centralized error handler keeps responses predictable for the frontend.
module.exports = (err, req, res, _next) => {
  console.error(err);

  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ success: false, message: 'File too large. Max 5MB.' });
    }
    return res.status(400).json({ success: false, message: err.message || 'Upload failed.' });
  }

  const status = err.status || 500;
  const message = status >= 500 ? 'Internal server error.' : err.message;

  res.status(status).json({ success: false, message });
};

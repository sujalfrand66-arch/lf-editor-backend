const fs = require('fs');
const path = require('path');
const { uploadsDir } = require('../middleware/upload');

// POST /api/upload
const uploadPhoto = (req, res, next) => {
  if (!req.file) {
    const err = new Error('No file uploaded.');
    err.status = 400;
    return next(err);
  }

  // Keep response shape identical for frontend compatibility.
  const imagePath = `/uploads/${req.file.filename}`;
  return res.json({
    success: true,
    image: imagePath
  });
};

// GET /api/images
const listImages = (_req, res) => {
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.error('Failed to read uploads directory.', err);
      return res.json([]); // Preserve existing frontend expectation on failure.
    }

    const images = files
      .filter((file) => !file.startsWith('.'))
      .map((file) => `/uploads/${file}`);

    res.json(images);
  });
};

module.exports = { uploadPhoto, listImages };

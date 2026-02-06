const express = require('express');
const upload = require('../middleware/upload');
const { uploadPhoto, listImages } = require('../controllers/uploadController');

const router = express.Router();

router.post('/upload', upload.single('photo'), uploadPhoto);
router.get('/images', listImages);

module.exports = router;

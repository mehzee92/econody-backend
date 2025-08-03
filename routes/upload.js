// routes/upload.js
const express = require('express');
const router = express.Router();
const multer = require('multer');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    let cleanName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '').toLowerCase();
    cleanName = cleanName.slice(-15);
    cb(null, "f"+Date.now().toString(36)+'-'+cleanName);
  },
});

const upload = multer({ storage: storage });

// Upload endpoint
router.post('/', upload.single('file_name'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.status(200).json({
    message: 'File uploaded successfully',
    fileName: req.file.originalname,
    savedAs: req.file.filename,
    path: req.file.path,
  });
});


module.exports = router;

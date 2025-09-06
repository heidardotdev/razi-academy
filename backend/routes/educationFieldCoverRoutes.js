const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  uploadEducationFieldCover,
  getEducationFieldCovers,
  updateEducationFieldCover,
  deleteEducationFieldCover
} = require('../controllers/educationFieldCoverController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/educationFieldCover');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/', upload.single('image'), uploadEducationFieldCover);
router.get('/', getEducationFieldCovers);
router.put('/:id', upload.single('image'), updateEducationFieldCover);
router.delete('/:id', deleteEducationFieldCover);

module.exports = router;

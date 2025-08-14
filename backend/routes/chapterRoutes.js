const express = require('express');
const { createChapter, getChaptersByCourse, updateChapter, deleteChapter } = require('../controllers/chapterController');

const router = express.Router();

router.post('/', createChapter);
router.get('/course/:courseId', getChaptersByCourse);
router.patch('/:id', updateChapter);
router.delete('/:id', deleteChapter);

module.exports = router;

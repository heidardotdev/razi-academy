const express = require('express');
const { createLesson, getLessonsByChapter, updateLesson, deleteLesson } = require('../controllers/lessonController');

const router = express.Router();

router.post('/', createLesson);
router.get('/chapter/:chapterId', getLessonsByChapter);
router.patch('/:id', updateLesson);
router.delete('/:id', deleteLesson);

module.exports = router;

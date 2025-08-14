const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/lessonController');

router.get('/chapter/:chapterId', ctrl.getLessonsByChapter);
router.post('/chapter/:chapterId', ctrl.createLesson);
router.put('/:id', ctrl.updateLesson);
router.delete('/:id', ctrl.deleteLesson);

module.exports = router;

const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/chapterController');

router.get('/course/:courseId', ctrl.getChaptersByCourse);
router.post('/course/:courseId', ctrl.createChapter);
router.put('/:id', ctrl.updateChapter);
router.delete('/:id', ctrl.deleteChapter);

module.exports = router;

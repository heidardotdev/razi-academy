const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/questionController');

router.get('/lesson/:lessonId', ctrl.getQuestionsByLesson);
router.post('/lesson/:lessonId', ctrl.createQuestion);
router.post('/:id/answers', ctrl.answerQuestion);
router.delete('/:id', ctrl.deleteQuestion);

module.exports = router;

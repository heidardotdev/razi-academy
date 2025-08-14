const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/commentController');

router.get('/course/:courseId', ctrl.getCommentsByCourse);
router.post('/course/:courseId', ctrl.createComment);
router.put('/:commentId/reply', ctrl.replyToComment);
router.delete('/:commentId', ctrl.deleteComment);
router.delete('/:commentId/reply', ctrl.deleteReply);

module.exports = router;

const Comment = require('../models/Comment');
const { toCommentDTO } = require('../utils/responseFormatter');

// GET /api/courses/:courseId/comments
exports.getCommentsByCourse = async (req, res) => {
  try {
    const list = await Comment.find({ courseId: req.params.courseId }).sort({ createdAt: -1 });
    res.json(list.map(toCommentDTO));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// POST /api/courses/:courseId/comments  { userId, content }
exports.createComment = async (req, res) => {
  try {
    const cm = await Comment.create({
      courseId: req.params.courseId,
      userId: req.body.userId,
      content: req.body.content
    });
    res.status(201).json(toCommentDTO(cm));
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// PUT /api/comments/:commentId/reply  { content, repliedBy }
exports.replyToComment = async (req, res) => {
  try {
    const cm = await Comment.findById(req.params.commentId);
    if (!cm) return res.status(404).json({ message: 'Comment not found' });
    if (cm.reply && cm.reply.content) return res.status(400).json({ message: 'Reply already exists' });

    cm.reply = {
      content: req.body.content,
      repliedBy: req.body.repliedBy,
      createdAt: new Date()
    };
    await cm.save();
    res.json(toCommentDTO(cm));
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// DELETE /api/comments/:commentId
exports.deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.commentId);
    res.json({ message: 'Comment deleted' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// DELETE /api/comments/:commentId/reply
exports.deleteReply = async (req, res) => {
  try {
    const cm = await Comment.findById(req.params.commentId);
    if (!cm) return res.status(404).json({ message: 'Comment not found' });
    cm.reply = undefined;
    await cm.save();
    res.json(toCommentDTO(cm));
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true, index: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true, trim: true },
  reply: {
    content: { type: String, trim: true },
    repliedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date }
  }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);

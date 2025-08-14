const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  video: { type: String, trim: true },
  attachedFile: { type: String, trim: true },
  chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema);

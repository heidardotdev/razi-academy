const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  price: { type: Number, default: 0 },
  coverImage: { type: String, default: '' },
  category: { type: String, default: '' },
  introVideo: { type: String, default: '' },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'CourseTeacher', required: true },
  courseAverageScore: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);

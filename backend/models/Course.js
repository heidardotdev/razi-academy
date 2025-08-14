const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  price: { type: Number, required: true, default: 0 },
  coverImage: { type: String, trim: true },
  category: { type: String, trim: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'CourseTeacher', required: true },
  studentsCount: { type: Number, default: 0 },
  courseAverageScore: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);

const mongoose = require('mongoose');

const courseTeacherSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  avatar: { type: String, trim: true },
  bio: { type: String, trim: true },
  expertise: { type: String, trim: true }
}, { timestamps: true });

module.exports = mongoose.model('CourseTeacher', courseTeacherSchema);

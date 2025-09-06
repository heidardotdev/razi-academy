const mongoose = require('mongoose');

const TeacherProfileSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('TeacherProfile', TeacherProfileSchema);

const mongoose = require("mongoose");

const courseTeacherProfileSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model("CourseTeacherProfile", courseTeacherProfileSchema);

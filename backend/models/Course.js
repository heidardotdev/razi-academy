const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  cover: { type: String },
  isComplete: { type: Number },
  price: { type: Number, required: true },
  description: { type: String },
  courseTeacherID: { type: mongoose.Schema.Types.ObjectId, ref: "CourseTeacher", required: true },
  courseCategoryID: { type: mongoose.Schema.Types.ObjectId, ref: "CourseCategory", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);

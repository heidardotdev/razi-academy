const mongoose = require("mongoose");

const courseCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  img: {
    type: String,
    default: ""
  }
}, { timestamps: true });

module.exports = mongoose.model("CourseCategory", courseCategorySchema);
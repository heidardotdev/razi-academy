// /models/courseModel.js
const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
  files: [String],
  createdAt: { type: Date, default: Date.now },
});

const qaSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  question: String,
  files: [String],
  createdAt: { type: Date, default: Date.now },
  replies: [replySchema],
});

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
  createdAt: { type: Date, default: Date.now },
});

const lessonSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,
  attachments: [String],
});

const chapterSchema = new mongoose.Schema({
  title: String,
  lessons: [lessonSchema],
});

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // teacher id
    price: Number,
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    studentsCount: { type: Number, default: 0 },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // enrolled users
    coverUrl: String,
    chapters: [chapterSchema],
    comments: [commentSchema],
    qa: [qaSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);

// /controllers/courseController.js
const Course = require("../models/courseModel");
const fs = require("fs");
const path = require("path");

// helper: sanitize folder name
const sanitize = (name) => {
  return name.replace(/[<>:"\/\\|?*\x00-\x1F]/g, "-").trim();
};

// create course folder structure
const createFolders = (courseName) => {
  const safe = sanitize(courseName || String(Date.now()));
  const basePath = path.join(__dirname, "..", "uploads", safe);
  const subFolders = ["Q&A", "lessons", "cover"];
  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath, { recursive: true });
  }
  subFolders.forEach((folder) => {
    const p = path.join(basePath, folder);
    if (!fs.existsSync(p)) fs.mkdirSync(p);
  });
};

// ================== basic course CRUD ==================
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().select(
      "title coverUrl teacher price status studentsCount"
    );
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course); // embedded fields included
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    createFolders(course.title);
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    // if title changed, you may want to create new folder for new title (we don't delete old)
    const old = await Course.findById(req.params.id).select("title");
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (req.body.title && old && old.title !== req.body.title) {
      createFolders(req.body.title);
    }
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted (folders remain)" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================== teacher courses & enrolled courses ==================
exports.getCoursesByTeacher = async (req, res) => {
  try {
    const teacherId = req.params.teacherId;
    const courses = await Course.find({ teacher: teacherId });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCoursesByEnrolledUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const courses = await Course.find({ students: userId });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================== enroll / unenroll ==================
exports.enroll = async (req, res) => {
  try {
    const courseId = req.params.id;
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: "userId is required" });

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const exists = course.students.find((s) => s.toString() === userId);
    if (!exists) {
      course.students.push(userId);
      course.studentsCount = course.students.length;
      await course.save();
    }
    res.json({ message: "enrolled", studentsCount: course.studentsCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.unenroll = async (req, res) => {
  try {
    const courseId = req.params.id;
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: "userId is required" });

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    course.students = course.students.filter((s) => s.toString() !== userId);
    course.studentsCount = course.students.length;
    await course.save();
    res.json({ message: "unenrolled", studentsCount: course.studentsCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================== chapters & lessons (embedded) ==================
// add chapter
exports.addChapter = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    const chapter = { title: req.body.title, lessons: [] };
    course.chapters.push(chapter);
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// update chapter
exports.updateChapter = async (req, res) => {
  try {
    const { id, chapterId } = req.params;
    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    const ch = course.chapters.id(chapterId);
    if (!ch) return res.status(404).json({ message: "Chapter not found" });
    ch.title = req.body.title ?? ch.title;
    await course.save();
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// delete chapter
exports.deleteChapter = async (req, res) => {
  try {
    const { id, chapterId } = req.params;
    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    course.chapters.id(chapterId).remove();
    await course.save();
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// add lesson to chapter (videoUrl and attachments can come from upload handler)
exports.addLesson = async (req, res) => {
  try {
    const { id, chapterId } = req.params;
    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    const ch = course.chapters.id(chapterId);
    if (!ch) return res.status(404).json({ message: "Chapter not found" });

    const attachments = [];
    if (req.files && req.files.length) {
      req.files.forEach((f) =>
        attachments.push(
          `/uploads/${encodeURIComponent(course.title)}/${"lessons"}/${
            f.filename
          }`
        )
      );
    }

    const lesson = {
      title: req.body.title,
      videoUrl:
        req.body.videoUrl || (attachments.length ? attachments[0] : undefined),
      attachments,
    };
    ch.lessons.push(lesson);
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// update lesson
exports.updateLesson = async (req, res) => {
  try {
    const { id, chapterId, lessonId } = req.params;
    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    const lesson = course.chapters.id(chapterId).lessons.id(lessonId);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    if (req.body.title) lesson.title = req.body.title;
    if (req.body.videoUrl) lesson.videoUrl = req.body.videoUrl;
    if (req.files && req.files.length) {
      // append new attachments
      req.files.forEach((f) => {
        lesson.attachments.push(
          `/uploads/${encodeURIComponent(course.title)}/${"lessons"}/${
            f.filename
          }`
        );
      });
    }
    await course.save();
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// delete lesson
exports.deleteLesson = async (req, res) => {
  try {
    const { id, chapterId, lessonId } = req.params;
    const course = await Course.findById(id);
    course.chapters.id(chapterId).lessons.id(lessonId).remove();
    await course.save();
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================== comments (embedded CRUD) ==================
exports.addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, text } = req.body;
    if (!userId || !text)
      return res.status(400).json({ message: "userId and text required" });
    const course = await Course.findById(id);
    course.comments.push({ userId, text });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const { text } = req.body;
    const course = await Course.findById(id);
    const cm = course.comments.id(commentId);
    if (!cm) return res.status(404).json({ message: "Comment not found" });
    cm.text = text ?? cm.text;
    await course.save();
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const course = await Course.findById(id);
    course.comments.id(commentId).remove();
    await course.save();
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================== Q&A (embedded CRUD + file upload) ==================
exports.addQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, question } = req.body;
    if (!userId || !question)
      return res.status(400).json({ message: "userId and question required" });

    const files = [];
    if (req.files && req.files.length) {
      req.files.forEach((f) =>
        files.push(
          `/uploads/${encodeURIComponent(
            req.body.courseTitle || "course"
          )}/Q&A/${f.filename}`
        )
      );
    }

    const course = await Course.findById(id);
    course.qa.push({ userId, question, files });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.replyQuestion = async (req, res) => {
  try {
    const { id, qaId } = req.params;
    const { userId, text } = req.body;
    if (!userId || !text)
      return res.status(400).json({ message: "userId and text required" });

    const files = [];
    if (req.files && req.files.length) {
      req.files.forEach((f) =>
        files.push(
          `/uploads/${encodeURIComponent(
            req.body.courseTitle || "course"
          )}/Q&A/${f.filename}`
        )
      );
    }

    const course = await Course.findById(id);
    const qa = course.qa.id(qaId);
    if (!qa) return res.status(404).json({ message: "Question not found" });
    qa.replies.push({ userId, text, files });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// update and delete QA items (simple)
exports.updateQuestion = async (req, res) => {
  try {
    const { id, qaId } = req.params;
    const { question } = req.body;
    const course = await Course.findById(id);
    const qa = course.qa.id(qaId);
    if (!qa) return res.status(404).json({ message: "Question not found" });
    qa.question = question ?? qa.question;
    await course.save();
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const { id, qaId } = req.params;
    const course = await Course.findById(id);
    course.qa.id(qaId).remove();
    await course.save();
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

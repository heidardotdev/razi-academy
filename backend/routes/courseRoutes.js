// /routes/courseRoutes.js
const express = require("express");
const router = express.Router();
const courseCtrl = require("../controllers/courseController");
const {
  uploadQA,
  uploadLesson,
  uploadCover,
} = require("../middleware/uploadMiddleware");

// basic CRUD
router.get("/", courseCtrl.getCourses);
router.get("/:id", courseCtrl.getCourse);
router.post("/", courseCtrl.createCourse);
router.put("/:id", courseCtrl.updateCourse);
router.delete("/:id", courseCtrl.deleteCourse);

// teacher & enrolled queries
router.get("/teacher/:teacherId", courseCtrl.getCoursesByTeacher);
router.get("/enrolled/:userId", courseCtrl.getCoursesByEnrolledUser);

// enroll / unenroll
router.post("/:id/enroll", courseCtrl.enroll);
router.post("/:id/unenroll", courseCtrl.unenroll);

// cover upload (single)
router.post("/:id/cover", uploadCover.single("cover"), async (req, res) => {
  // after upload, update coverUrl
  const Course = require("../models/courseModel");
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    course.coverUrl = `/uploads/${encodeURIComponent(course.title)}/cover/${
      req.file.filename
    }`;
    await course.save();
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// chapters & lessons
router.post("/:id/chapters", courseCtrl.addChapter);
router.put("/:id/chapters/:chapterId", courseCtrl.updateChapter);
router.delete("/:id/chapters/:chapterId", courseCtrl.deleteChapter);

// add lesson with optional files (field name: 'attachments' as multiple)
router.post(
  "/:id/chapters/:chapterId/lessons",
  uploadLesson.array("attachments", 10),
  courseCtrl.addLesson
);
router.put(
  "/:id/chapters/:chapterId/lessons/:lessonId",
  uploadLesson.array("attachments", 10),
  courseCtrl.updateLesson
);
router.delete(
  "/:id/chapters/:chapterId/lessons/:lessonId",
  courseCtrl.deleteLesson
);

// comments
router.post("/:id/comments", courseCtrl.addComment);
router.put("/:id/comments/:commentId", courseCtrl.updateComment);
router.delete("/:id/comments/:commentId", courseCtrl.deleteComment);

// Q&A (files field name: 'files')
router.post("/:id/qa", uploadQA.array("files", 10), courseCtrl.addQuestion);
router.post(
  "/:id/qa/:qaId/replies",
  uploadQA.array("files", 10),
  courseCtrl.replyQuestion
);
router.put("/:id/qa/:qaId", courseCtrl.updateQuestion);
router.delete("/:id/qa/:qaId", courseCtrl.deleteQuestion);

module.exports = router;

// /middleware/uploadMiddleware.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Course = require("../models/courseModel");

// helper: sanitize folder name
const sanitize = (name) => {
  return name.replace(/[<>:"\/\\|?*\x00-\x1F]/g, "-").trim();
};

// factory to create multer storage that places files into course-specific subfolders
const storageFor = (subfolder) => {
  return multer.diskStorage({
    destination: async (req, file, cb) => {
      try {
        const courseId = req.params.id || req.body.courseId;
        if (!courseId)
          return cb(new Error("Course id required in params or body"));
        const course = await Course.findById(courseId).select("title");
        if (!course) return cb(new Error("Course not found"));
        const courseFolder = sanitize(course.title) || course._id.toString();
        const base = path.join(
          __dirname,
          "..",
          "uploads",
          courseFolder,
          subfolder
        );
        fs.mkdirSync(base, { recursive: true });
        cb(null, base);
      } catch (err) {
        cb(err);
      }
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext).replace(/\s+/g, "-");
      const finalName = `${Date.now()}-${name}${ext}`;
      cb(null, finalName);
    },
  });
};

// middleware creators
const uploadQA = multer({ storage: storageFor("Q&A") });
const uploadLesson = multer({ storage: storageFor("lessons") });
const uploadCover = multer({ storage: storageFor("cover") });

module.exports = {
  uploadQA,
  uploadLesson,
  uploadCover,
};

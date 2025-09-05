const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  createProfile,
  getProfiles,
  updateProfile,
  deleteProfile,
} = require("../controllers/courseTeacherProfileController");

const router = express.Router();

// 📌 تنظیمات Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/courseTeacherProfile/"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// 📌 مسیرها
router.post("/", upload.single("image"), createProfile);
router.get("/", getProfiles);
router.put("/:id", upload.single("image"), updateProfile);
router.delete("/:id", deleteProfile);

module.exports = router;

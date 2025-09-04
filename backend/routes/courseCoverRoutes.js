const express = require("express");
const router = express.Router();
const {
  upload,
  uploadCourseCover,
  getAllCourseCovers,
  updateCourseCover,
  deleteCourseCover,
} = require("../controllers/courseCoverController");

router.post("/", upload.single("cover"), uploadCourseCover);
router.get("/", getAllCourseCovers);
router.put("/:id", upload.single("cover"), updateCourseCover);
router.delete("/:id", deleteCourseCover);

module.exports = router;

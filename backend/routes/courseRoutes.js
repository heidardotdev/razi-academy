const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

// CRUD
router.post("/", courseController.createCourse);
router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);
router.put("/:id", courseController.updateCourse);
router.delete("/:id", courseController.deleteCourse);
router.get("/teacher/:teacherId", courseController.getCoursesByTeacher);


module.exports = router;

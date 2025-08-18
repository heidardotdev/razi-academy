// backend/routes/courseTeacherRoutes.js
const express = require("express");
const router = express.Router();
const {
    registerTeacher,
    loginTeacher,
    getTeacherProfile,
    getAllTeachers,
    getTeacherById,
    deleteTeacher,
    updateTeacher
} = require("../controllers/courseTeacherController");
const { protectTeacher } = require("../middleware/courseTeacherAuth");

router.post("/register", registerTeacher);
router.post("/login", loginTeacher);
router.get("/profile", protectTeacher, getTeacherProfile);
router.get("/", getAllTeachers);
router.get("/:id", getTeacherById);
router.delete("/:id", deleteTeacher);
router.put("/:id", updateTeacher);


module.exports = router;

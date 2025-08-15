const jwt = require("jsonwebtoken");
const CourseTeacher = require("../models/CourseTeacher");

exports.protectTeacher = async (req, res, next) => {
  try {
    let token = null;

    // Authorization: Bearer <token>
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const teacher = await CourseTeacher.findById(decoded.id).select("-password");
    if (!teacher) {
      return res.status(401).json({ message: "Not authorized: teacher not found" });
    }

    req.user = teacher; // برای کنترلرها
    next();
  } catch (err) {
    console.error("protectTeacher error:", err);
    return res.status(401).json({ message: "Not authorized, token invalid/expired" });
  }
};

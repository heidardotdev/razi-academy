const Course = require("../models/Course");

// 📍 ایجاد دوره
exports.createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();

    const populatedCourse = await Course.findById(course._id)
      .populate("courseTeacherID")
      .populate("courseCategoryID");

    res.status(201).json(populatedCourse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📍 دریافت همه دوره‌ها
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("courseTeacherID")
      .populate("courseCategoryID");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📍 دریافت یک دوره با آیدی
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("courseTeacherID")
      .populate("courseCategoryID");

    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// گرفتن همه دوره‌های یک استاد خاص
exports.getCoursesByTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const courses = await Course.find({ courseTeacherID: teacherId })
      .populate("courseTeacherID");

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses by teacher", error });
  }
};

// 📍 آپدیت دوره
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("courseTeacherID")
      .populate("courseCategoryID");

    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📍 حذف دوره (hard delete)
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

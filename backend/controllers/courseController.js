const Course = require('../models/Course');
const Chapter = require('../models/Chapter');
const Lesson = require('../models/Lesson');
const Comment = require('../models/Comment');
const CourseTeacher = require('../models/CourseTeacher');
const Enrollment = require('../models/Enrollment');
const { toCourseListDTO, toCourseDetailsDTO } = require('../utils/responseFormatter');

// GET /api/courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.aggregate([
      {
        $lookup: {
          from: 'chapters',
          localField: '_id',
          foreignField: 'courseId',
          as: 'chapters'
        }
      },
      { $addFields: { chaptersCount: { $size: '$chapters' } } },
      { $project: { chapters: 0 } }
    ]);
    res.json(courses.map(toCourseListDTO));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// GET /api/courses/popular
exports.getPopularCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ studentsCount: -1 }).limit(3);
    res.json(courses.map(toCourseListDTO));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// GET /api/courses/:id (courseDetails)
exports.getCourseDetails = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const teacher = await CourseTeacher.findById(course.teacherId).select('fullName avatar');
    const chapters = await Chapter.aggregate([
      { $match: { courseId: course._id } },
      {
        $lookup: {
          from: 'lessons',
          localField: '_id',
          foreignField: 'chapterId',
          as: 'lessons'
        }
      },
      { $project: { title: 1, lessons: { title: 1, video: 1, attachedFile: 1 } } }
    ]);

    const comments = await Comment.find({ courseId: course._id }).sort({ createdAt: -1 });

    res.json(toCourseDetailsDTO(course, teacher, chapters, comments));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// POST /api/courses
exports.createCourse = async (req, res) => {
  try {
    const created = await Course.create(req.body);
    res.status(201).json(toCourseListDTO(created));
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// PUT /api/courses/:id
exports.updateCourse = async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Course not found' });
    res.json(toCourseListDTO(updated));
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// DELETE /api/courses/:id
exports.deleteCourse = async (req, res) => {
  try {
    const id = req.params.id;
    await Course.findByIdAndDelete(id);
    await Chapter.deleteMany({ courseId: id });
    await Comment.deleteMany({ courseId: id });
    await Enrollment.deleteMany({ courseId: id });
    // درس‌ها به‌صورت cascade با حذف Chapter پاک می‌شن در کنترلر chapter
    res.json({ message: 'Course and related data deleted' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// POST /api/courses/:id/join  { userId }
exports.joinCourse = async (req, res) => {
  try {
    const { userId } = req.body;
    const courseId = req.params.id;
    if (!userId) return res.status(400).json({ message: 'userId is required' });

    await Enrollment.create({ userId, courseId, status: 'active' });
    await Course.findByIdAndUpdate(courseId, { $inc: { studentsCount: 1 } });

    res.status(201).json({ success: true, message: 'Joined course successfully', courseId, userId });
  } catch (e) {
    if (e.code === 11000) {
      return res.status(200).json({ success: true, message: 'Already enrolled' });
    }
    res.status(400).json({ message: e.message });
  }
};

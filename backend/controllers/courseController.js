const Course = require('../models/Course');
const Chapter = require('../models/Chapter');
const Lesson = require('../models/Lesson');
const Enrollment = require('../models/Enrollment');

// کمک: ساخت خروجی تمیز
const shapeCourseSummary = (doc) => ({
  _id: doc._id,
  title: doc.title,
  description: doc.description,
  price: doc.price,
  coverImage: doc.coverImage,
  category: doc.category,
  courseAverageScore: doc.courseAverageScore || 0,
  chaptersCount: doc.chaptersCount || 0,
  studentsCount: doc.studentsCount || 0,
  createdAt: doc.createdAt,
  teacher: doc.teacher ? {
    _id: doc.teacher._id,
    fullName: doc.teacher.fullName,
    avatar: doc.teacher.avatar,
    bio: doc.teacher.bio,
  } : null,
});

// @POST /api/courses
exports.createCourse = async (req, res) => {
  try {
    const created = await Course.create(req.body);
    // populate teacher
    const course = await Course.findById(created._id)
      .populate('teacherId', 'fullName avatar bio')
      .lean();

    // counts
    const [chaptersCount, studentsCount] = await Promise.all([
      Chapter.countDocuments({ courseId: course._id }),
      Enrollment.countDocuments({ courseId: course._id }),
    ]);

    return res.status(201).json(
      shapeCourseSummary({
        ...course,
        teacher: course.teacherId,
        chaptersCount,
        studentsCount,
      })
    );
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

// @GET /api/courses
exports.getCourses = async (req, res) => {
  try {
    // aggregation برای برگشت خلاصه‌های بهینه با شمارش‌ها
    const data = await Course.aggregate([
      {
        $lookup: {
          from: 'courseteachers',
          localField: 'teacherId',
          foreignField: '_id',
          as: 'teacher'
        }
      },
      { $unwind: '$teacher' },
      {
        $lookup: {
          from: 'chapters',
          localField: '_id',
          foreignField: 'courseId',
          as: '_chapters'
        }
      },
      {
        $lookup: {
          from: 'enrollments',
          localField: '_id',
          foreignField: 'courseId',
          as: '_enrollments'
        }
      },
      {
        $addFields: {
          chaptersCount: { $size: '$_chapters' },
          studentsCount: { $size: '_enrollments' }
        }
      },
      {
        $project: {
          title: 1, description: 1, price: 1, coverImage: 1, category: 1,
          courseAverageScore: 1, createdAt: 1, chaptersCount: 1, studentsCount: 1,
          teacher: { _id: '$teacher._id', fullName: '$teacher.fullName', avatar: '$teacher.avatar', bio: '$teacher.bio' }
        }
      },
      { $sort: { createdAt: -1 } }
    ]);

    return res.json(data.map(shapeCourseSummary));
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

// @GET /api/courses/popular
exports.getPopularCourses = async (req, res) => {
  try {
    const data = await Course.aggregate([
      {
        $lookup: {
          from: 'courseteachers',
          localField: 'teacherId',
          foreignField: '_id',
          as: 'teacher'
        }
      },
      { $unwind: '$teacher' },
      {
        $lookup: {
          from: 'enrollments',
          localField: '_id',
          foreignField: 'courseId',
          as: '_enrollments'
        }
      },
      { $addFields: { studentsCount: { $size: '$_enrollments' } } },
      {
        $project: {
          title: 1, description: 1, price: 1, coverImage: 1, category: 1,
          courseAverageScore: 1, createdAt: 1, studentsCount: 1,
          teacher: { _id: '$teacher._id', fullName: '$teacher.fullName', avatar: '$teacher.avatar', bio: '$teacher.bio' }
        }
      },
      { $sort: { studentsCount: -1, createdAt: -1 } },
      { $limit: 3 }
    ]);

    return res.json(data.map(d => ({
      ...shapeCourseSummary({ ...d, chaptersCount: undefined }),
    })));
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

// @GET /api/courses/:id
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('teacherId', 'fullName avatar bio')
      .lean();
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const [chaptersCount, studentsCount] = await Promise.all([
      Chapter.countDocuments({ courseId: course._id }),
      Enrollment.countDocuments({ courseId: course._id }),
    ]);

    return res.json(shapeCourseSummary({
      ...course, teacher: course.teacherId, chaptersCount, studentsCount
    }));
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

// @GET /api/courses/:id/details
exports.getCourseDetails = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('teacherId', 'fullName avatar bio')
      .lean();
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // chapters + lessons
    const chapters = await Chapter.find({ courseId: course._id }).sort({ order: 1, createdAt: 1 }).lean();
    const chapterIds = chapters.map(c => c._id);
    const lessons = await Lesson.find({ chapterId: { $in: chapterIds } }).sort({ order: 1, createdAt: 1 }).lean();

    const chaptersWithLessons = chapters.map(ch => ({
      _id: ch._id,
      title: ch.title,
      order: ch.order,
      createdAt: ch.createdAt,
      lessons: lessons.filter(ls => String(ls.chapterId) === String(ch._id)).map(ls => ({
        _id: ls._id,
        title: ls.title,
        videoUrl: ls.videoUrl,
        attachment: ls.attachment,
        order: ls.order,
        createdAt: ls.createdAt,
      }))
    }));

    const [studentsCount] = await Promise.all([
      Enrollment.countDocuments({ courseId: course._id }),
    ]);

    return res.json({
      _id: course._id,
      title: course.title,
      description: course.description,
      price: course.price,
      coverImage: course.coverImage,
      category: course.category,
      introVideo: course.introVideo,
      courseAverageScore: course.courseAverageScore || 0,
      studentsCount,
      chaptersCount: chapters.length,
      createdAt: course.createdAt,
      teacher: {
        _id: course.teacherId._id,
        fullName: course.teacherId.fullName,
        avatar: course.teacherId.avatar,
        bio: course.teacherId.bio
      },
      chapters: chaptersWithLessons
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

// @PATCH /api/courses/:id
exports.updateCourse = async (req, res) => {
  try {
    await Course.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
    const updated = await Course.findById(req.params.id)
      .populate('teacherId', 'fullName avatar bio')
      .lean();
    if (!updated) return res.status(404).json({ message: 'Course not found' });

    const [chaptersCount, studentsCount] = await Promise.all([
      Chapter.countDocuments({ courseId: updated._id }),
      Enrollment.countDocuments({ courseId: updated._id }),
    ]);

    return res.json(shapeCourseSummary({
      ...updated, teacher: updated.teacherId, chaptersCount, studentsCount
    }));
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

// @DELETE /api/courses/:id
exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    // (اختیاری) می‌تونی اینجا Chapters/Lessons رو هم cascade delete کنی
    return res.json({ success: true });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

// @GET /api/courses/:id/students
exports.getCourseStudents = async (req, res) => {
  try {
    const enrolls = await Enrollment.find({ courseId: req.params.id })
      .populate('userId', 'userName userFullName')  // اسم فیلدها را با مدل User خودت هماهنگ کن
      .lean();

    const students = enrolls
      .filter(e => e.userId)
      .map(e => ({
        _id: e.userId._id,
        userName: e.userId.userName,
        userFullName: e.userId.userFullName,
        enrolledAt: e.createdAt
      }));

    return res.json(students);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

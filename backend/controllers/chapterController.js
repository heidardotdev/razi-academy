const Chapter = require('../models/Chapter');
const Lesson = require('../models/Lesson');

exports.createChapter = async (req, res) => {
  try {
    const chapter = await Chapter.create(req.body);
    return res.status(201).json({
      _id: chapter._id,
      title: chapter.title,
      order: chapter.order,
      courseId: chapter.courseId,
      createdAt: chapter.createdAt
    });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

exports.getChaptersByCourse = async (req, res) => {
  try {
    const chapters = await Chapter.find({ courseId: req.params.courseId })
      .sort({ order: 1, createdAt: 1 })
      .lean();

    // تعداد درس‌های هر فصل
    const chapterIds = chapters.map(c => c._id);
    const lessonCounts = await Lesson.aggregate([
      { $match: { chapterId: { $in: chapterIds } } },
      { $group: { _id: '$chapterId', count: { $sum: 1 } } }
    ]);

    const countMap = {};
    lessonCounts.forEach(x => { countMap[String(x._id)] = x.count; });

    return res.json(chapters.map(ch => ({
      _id: ch._id,
      title: ch.title,
      order: ch.order,
      createdAt: ch.createdAt,
      lessonsCount: countMap[String(ch._id)] || 0
    })));
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

exports.updateChapter = async (req, res) => {
  try {
    const updated = await Chapter.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).lean();
    if (!updated) return res.status(404).json({ message: 'Chapter not found' });
    return res.json({
      _id: updated._id, title: updated.title, order: updated.order, courseId: updated.courseId, createdAt: updated.createdAt
    });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

exports.deleteChapter = async (req, res) => {
  try {
    await Chapter.findByIdAndDelete(req.params.id);
    // (اختیاری) درس‌های زیرمجموعه را هم حذف کن
    return res.json({ success: true });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

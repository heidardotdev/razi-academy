const Lesson = require('../models/Lesson');

exports.createLesson = async (req, res) => {
  try {
    const lesson = await Lesson.create(req.body);
    return res.status(201).json({
      _id: lesson._id,
      title: lesson.title,
      videoUrl: lesson.videoUrl,
      attachment: lesson.attachment,
      order: lesson.order,
      chapterId: lesson.chapterId,
      createdAt: lesson.createdAt
    });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

exports.getLessonsByChapter = async (req, res) => {
  try {
    const lessons = await Lesson.find({ chapterId: req.params.chapterId })
      .sort({ order: 1, createdAt: 1 })
      .lean();

    return res.json(lessons.map(ls => ({
      _id: ls._id,
      title: ls.title,
      videoUrl: ls.videoUrl,
      attachment: ls.attachment,
      order: ls.order,
      createdAt: ls.createdAt
    })));
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

exports.updateLesson = async (req, res) => {
  try {
    const updated = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).lean();
    if (!updated) return res.status(404).json({ message: 'Lesson not found' });
    return res.json({
      _id: updated._id, title: updated.title, videoUrl: updated.videoUrl,
      attachment: updated.attachment, order: updated.order, chapterId: updated.chapterId, createdAt: updated.createdAt
    });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

exports.deleteLesson = async (req, res) => {
  try {
    await Lesson.findByIdAndDelete(req.params.id);
    return res.json({ success: true });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

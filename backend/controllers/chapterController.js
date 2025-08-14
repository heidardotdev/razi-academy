const Chapter = require('../models/Chapter');
const Lesson = require('../models/Lesson');
const { toChapterDTO } = require('../utils/responseFormatter');

// GET /api/courses/:courseId/chapters
exports.getChaptersByCourse = async (req, res) => {
  try {
    const list = await Chapter.find({ courseId: req.params.courseId }).sort({ createdAt: -1 });
    res.json(list.map(toChapterDTO));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// POST /api/courses/:courseId/chapters  { title }
exports.createChapter = async (req, res) => {
  try {
    const chapter = await Chapter.create({ title: req.body.title, courseId: req.params.courseId });
    res.status(201).json(toChapterDTO(chapter));
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// PUT /api/chapters/:id
exports.updateChapter = async (req, res) => {
  try {
    const updated = await Chapter.findByIdAndUpdate(req.params.id, { title: req.body.title }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Chapter not found' });
    res.json(toChapterDTO(updated));
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// DELETE /api/chapters/:id
exports.deleteChapter = async (req, res) => {
  try {
    await Lesson.deleteMany({ chapterId: req.params.id });
    await Chapter.findByIdAndDelete(req.params.id);
    res.json({ message: 'Chapter and related lessons deleted' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

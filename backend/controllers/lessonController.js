const Lesson = require('../models/Lesson');
const { toLessonDTO } = require('../utils/responseFormatter');

// GET /api/chapters/:chapterId/lessons
exports.getLessonsByChapter = async (req, res) => {
  try {
    const list = await Lesson.find({ chapterId: req.params.chapterId }).sort({ createdAt: 1 });
    res.json(list.map(toLessonDTO));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// POST /api/chapters/:chapterId/lessons  { title, video, attachedFile }
exports.createLesson = async (req, res) => {
  try {
    const lesson = await Lesson.create({ ...req.body, chapterId: req.params.chapterId });
    res.status(201).json(toLessonDTO(lesson));
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// PUT /api/lessons/:id
exports.updateLesson = async (req, res) => {
  try {
    const updated = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Lesson not found' });
    res.json(toLessonDTO(updated));
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// DELETE /api/lessons/:id
exports.deleteLesson = async (req, res) => {
  try {
    await Lesson.findByIdAndDelete(req.params.id);
    res.json({ message: 'Lesson deleted' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

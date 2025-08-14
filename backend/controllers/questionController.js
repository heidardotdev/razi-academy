const Question = require('../models/Question');
const { toQuestionDTO } = require('../utils/responseFormatter');

// GET /api/lessons/:lessonId/questions
exports.getQuestionsByLesson = async (req, res) => {
  try {
    const list = await Question.find({ lessonId: req.params.lessonId }).sort({ createdAt: -1 });
    res.json(list.map(toQuestionDTO));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// POST /api/lessons/:lessonId/questions  { userId, content }
exports.createQuestion = async (req, res) => {
  try {
    const q = await Question.create({
      lessonId: req.params.lessonId,
      userId: req.body.userId,
      content: req.body.content
    });
    res.status(201).json(toQuestionDTO(q));
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// POST /api/questions/:id/answers  { content, answeredBy }
exports.answerQuestion = async (req, res) => {
  try {
    const q = await Question.findById(req.params.id);
    if (!q) return res.status(404).json({ message: 'Question not found' });
    q.answers.push({
      content: req.body.content,
      answeredBy: req.body.answeredBy,
      createdAt: new Date()
    });
    await q.save();
    res.json(toQuestionDTO(q));
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// DELETE /api/questions/:id
exports.deleteQuestion = async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: 'Question deleted' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const CourseTeacher = require('../models/CourseTeacher');
const jwt = require('jsonwebtoken');

const sign = (id) => jwt.sign({ id, role: 'courseTeacher' }, process.env.JWT_SECRET, { expiresIn: '30d' });

exports.register = async (req, res) => {
  try {
    const { username, password, fullName, bio, avatar } = req.body;
    const exists = await CourseTeacher.findOne({ username });
    if (exists) return res.status(400).json({ message: 'username already exists' });

    const t = await CourseTeacher.create({ username, password, fullName, bio, avatar });
    res.status(201).json({ _id: t._id, username: t.username, fullName: t.fullName, role: t.role, token: sign(t._id) });
  } catch (e) { res.status(400).json({ message: e.message }); }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const t = await CourseTeacher.findOne({ username });
    if (!t) return res.status(404).json({ message: 'teacher not found' });
    const ok = await t.matchPassword(password);
    if (!ok) return res.status(401).json({ message: 'invalid credentials' });
    res.json({ _id: t._id, username: t.username, fullName: t.fullName, role: t.role, token: sign(t._id) });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.list = async (req, res) => {
  try {
    const items = await CourseTeacher.find().select('-password');
    res.json(items);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.get = async (req, res) => {
  try {
    const t = await CourseTeacher.findById(req.params.id).select('-password');
    if (!t) return res.status(404).json({ message: 'teacher not found' });
    res.json(t);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

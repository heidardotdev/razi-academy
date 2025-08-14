const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const courseTeacherSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true, trim: true },
  bio: { type: String, default: '' },
  avatar: { type: String, default: '' },
  role: { type: String, default: 'courseTeacher' },
}, { timestamps: true });

courseTeacherSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

courseTeacherSchema.methods.matchPassword = function (entered) {
  return bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model('CourseTeacher', courseTeacherSchema);

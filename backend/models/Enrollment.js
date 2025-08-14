const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true, index: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  status: { type: String, enum: ['active', 'cancelled', 'completed'], default: 'active' },
  joinedAt: { type: Date, default: Date.now }
}, { timestamps: true });

enrollmentSchema.index({ courseId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);

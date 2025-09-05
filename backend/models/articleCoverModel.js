const mongoose = require('mongoose');

const articleCoverSchema = new mongoose.Schema({
  path: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ArticleCover', articleCoverSchema);

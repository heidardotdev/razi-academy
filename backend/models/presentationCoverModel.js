const mongoose = require("mongoose");

const presentationCoverSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("PresentationCover", presentationCoverSchema);

const mongoose = require('mongoose');

const educationFieldCoverSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('EducationFieldCover', educationFieldCoverSchema);

const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true }, // مسیر تصویر ذخیره می‌شود
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("UserProfile", userProfileSchema);

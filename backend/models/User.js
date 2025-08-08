const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userFullName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userRole: { type: String, default: "USER" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

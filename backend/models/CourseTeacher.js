// backend/models/CourseTeacher.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const courseTeacherSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userFullName: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ""
    },
    profileImg: {
        type: String,
        default: ""
    }
}, { timestamps: true });

// هش کردن پسورد قبل ذخیره
courseTeacherSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// متد برای مقایسه پسورد
courseTeacherSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("CourseTeacher", courseTeacherSchema);

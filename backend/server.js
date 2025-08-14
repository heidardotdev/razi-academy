const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const connectDB = require('./config/db');




dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://127.0.0.1:5500", // فقط فرانت خودت دسترسی داره
  credentials: true,
}));

// Routes
app.use("/api/users", authRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });




const courseRoutes = require('./routes/courseRoutes');
const chapterRoutes = require('./routes/chapterRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const commentRoutes = require('./routes/commentRoutes');
const questionRoutes = require('./routes/questionRoutes');




app.use('/api/courses', courseRoutes);
app.use('/api/chapters', chapterRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/questions', questionRoutes);

const courseTeacherRoutes = require('./routes/courseTeacherRoutes');
app.use('/api/course-teachers', courseTeacherRoutes);



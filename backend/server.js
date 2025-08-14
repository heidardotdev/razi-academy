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





// Routes
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/chapters', require('./routes/chapterRoutes'));
app.use('/api/lessons', require('./routes/lessonRoutes'));
app.use('/api/course-teachers', require('./routes/courseTeacherRoutes'));

app.get('/', (req, res) => res.send('API is running'));



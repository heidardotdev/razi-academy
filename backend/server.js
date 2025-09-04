const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");





dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://127.0.0.1:5500", // فقط فرانت خودت دسترسی داره
  credentials: true,
}));

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
app.use("/api/users", authRoutes);



// course teacher
const courseTeacherRoutes = require("./routes/courseTeacherRoutes");
app.use("/api/courseTeacher", courseTeacherRoutes);





// course category
const courseCategoryRoutes = require("./routes/courseCategoryRoutes");
app.use("/api/course-categories", courseCategoryRoutes);


// course
const courseRoutes = require("./routes/courseRoutes");
app.use("/api/courses", courseRoutes);

//course cover uploader
const courseCoverRoutes = require("./routes/courseCoverRoutes");
app.use("/api/course-cover", courseCoverRoutes);




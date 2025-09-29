const express = require("express");
const cors = require("cors");
const connectDB = require("./config/config");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

// اول از همه CORS
app.use(
  cors({
    origin: "*", // تو MVP همه اجازه دارن
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("*", cors()); // این برای preflight مهمه

// Middlewareها
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// اتصال به دیتابیس
connectDB();

// روت‌ها
app.use("/api/users", userRoutes);
const courseRoutes = require("./routes/courseRoutes");
app.use("/api/courses", courseRoutes);
app.get("/", (req, res) => {
  res.send("سرور بالا هست 😎");
});

// Error Middleware آخر از همه
app.use(errorHandler);

module.exports = app;

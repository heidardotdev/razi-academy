const express = require('express');
const connectDB = require('./config/config');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();
app.use(express.json());
app.use('/uploads', express.static('uploads'));

connectDB();

app.use('/api/users', userRoutes);

// Error Middleware
app.use(errorHandler);

module.exports = app;

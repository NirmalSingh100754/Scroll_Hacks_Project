// app.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const consultRoutes = require('./routes/consultRoutes');

const app = express();
app.use(express.json());
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api', consultRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const mongoose = require('mongoose');
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

//load env variables
require('dotenv').config();

//Root route
app.get('/', (req, res) => {
    res.send("my server Api is running");
})

// initailizing express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

//error handling middleware
app.use((res, req, err, next) => {
    console.error(err.stack)
    res.status(err.statusCode || 5000).json({
        success: false,
        error: err.message || 'Server Error',
    });
});


module.exports = app;
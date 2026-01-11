const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const session = require('express-session');

//load env variables
dotenv.config();

// initailizing express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: { secure: false, maxAge: 60000 *60*60*24 } // 24 hour
}));

//Root route
app.get('/', (req, res) => {
    res.send("my Kademy server Api is running");
})


// error handling middleware (must have signature: err, req, res, next)
app.use((err, req, res, next) => {
    console.error(err && err.stack ? err.stack : err);
    res.status((err && err.statusCode) || 500).json({
        success: false,
        error: (err && err.message) || 'Server Error',
    });
});

const Port = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(Port, () => {
            console.log(`Server running on port ${Port}`);
        });
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};

startServer();

module.exports = app;
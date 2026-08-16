const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const session = require('express-session');

//import routers
const authRouter = require('./router/authRouters'); 
const subjectRouter = require('./router/subjectRouter');
const historyRouter = require('./router/historyRouter');
const tutorRouter = require('./router/tutorRouter');
const studentRouter = require('./router/studentsRouther');
const contentRouter = require('./router/contentRouter');
const commentRouter = require('./router/commentRouter');
const QualificationRouter = require('./router/qualificationRouter');    
const studentMailRouter = require('./router/studentMailRouter')


//load env variables
dotenv.config();

// initailizing express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    saveUninitialized: false,
    resave: false,
    cookie: { secure: false, httpOnly: true, sameSite: 'lax', maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

//use routers
app.use('/api/subjects', subjectRouter);
app.use('/api/history', historyRouter);
app.use('/api', authRouter);
app.use('/api/tutors', tutorRouter);
app.use('/api/students', studentRouter);
app.use('/api/contents', contentRouter);
app.use('/api/comments', commentRouter);
app.use('/api/qualifications', QualificationRouter);
app.use('/api', studentMailRouter);


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
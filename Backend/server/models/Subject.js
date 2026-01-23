const mongoose = require('mongoose');
const subjectRegex = /^[a-zA-Z\s]+$/;
const SubjectSchema = new mongoose.Schema({
    subject_name: {
        type: String,
        trim: true,
        required: [true, 'Subject name is required'],
        minlength: [2, 'Subject name must be at least 2 characters long'],
        maxlength: [100, 'Subject name cannot exceed 100 characters'],
        match: [subjectRegex, 'Subject name can only contain letters and spaces']
    },
    course_type: {
        type: String,
        enum: {
            values: ['Science', 'Commercial',  'Arts', 'General'],
            message: 'Course type must be one of: science, Commercial, Humanity, Arts, or General'
        },
        required: [true, 'Course type is required'],
        trim: true
    }
}, {timestamps: true})

// Add validation for duplicates
SubjectSchema.index({ subject_name: 1, course_type: 1 }, { unique: true });

module.exports = mongoose.model("Subject", SubjectSchema);
const mongoose = require('mongoose');

const emailRegex = /^\S+@\S+\.\S+$/;
const phoneRegex = /^\+?[0-9]{7,15}$/;
const nameRegex = /^[a-zA-Z\s'\-]+$/;

const StudentSchema = new mongoose.Schema({
    Fname: {
        type: String,
        trim: true,
        required: [true, 'First name is required'],
        minlength: [2, 'First name must be at least 2 characters'],
        maxlength: [50, 'First name cannot exceed 50 characters'],
        match: [nameRegex, 'First name contains invalid characters']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        match: [emailRegex, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    profile_img: {
        type: String,
        trim: true,
        default: 'default-student.jpg'
    },
    address: {
        type: String,
        trim: true,
        default: null
    },
    phone_no: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
        match: [phoneRegex, 'Phone number must contain only digits and may start with +, length 7-15']
    },
    birth_date: {
        type: Date,
        default: null,
        validate: {
            validator: function(v) {
                if (!v) return true;
                return v < new Date();
            },
            message: 'Birth date must be in the past'
        }
    },
    enrolled_courses: {
        type: String,
        enum: {
            values: ['Science', 'Commercial', 'Arts'],
            message: 'Course type must be one of: science, Commercial, or Humanity'
        },
        default: null
    },
    school_name: {
        type: String,
        trim: true,
        default: null
    },
    completeRegistration: {
        type: Boolean,
        default: false
    },
    state: {
        type: String,
        trim: true,
        default: null
    },
    country: {
        type: String,
        trim: true,
        default: null
    },
    resetOtp: {
        type: String,
        default: null
    },
    otpExpired: {
        type: Date,
        default: null
    }


}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);

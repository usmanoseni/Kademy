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
    Lname: {
        type: String,
        trim: true,
        required: [true, 'Last name is required'],
        minlength: [2, 'Last name must be at least 2 characters'],
        maxlength: [50, 'Last name cannot exceed 50 characters'],
        match: [nameRegex, 'Last name contains invalid characters']
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
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
        default: []
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
    }

}, { timestamps: true });

// Indexes
StudentSchema.index({ email: 1 }, { unique: true });
StudentSchema.index({ phone_no: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('Student', StudentSchema);

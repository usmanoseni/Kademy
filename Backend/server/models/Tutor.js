const mongoose = require('mongoose');

const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i;
const emailRegex = /^\S+@\S+\.\S+$/;
const phoneRegex = /^\+?[0-9]{7,15}$/;
const nameRegex = /^[a-zA-Z\s'\-]+$/;

const TutorSchema = new mongoose.Schema({
    Fname: {
        type: String,
        required: [true, 'First name is required'],
        minlength: [2, 'First name must be at least 2 characters'],
        maxlength: [80, 'First name cannot exceed 50 characters'],
        trim: true,
        match: [nameRegex , 'First name can contain only letters, spaces, apostrophes and hyphens']
    },

    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        trim: true,
        match: [emailRegex, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    address: {
        type: String,
        trim: true,
        default: null
    },
    phone1_no: {
        type: String,
        required: [true, 'Primary phone number is required'],
        unique: true,
        trim: true,
        match: [phoneRegex, 'Phone number must contain only digits and may start with +, length 7-15']
    },
    phone2_no: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
        match: [phoneRegex, 'Phone number must contain only digits and may start with +, length 7-15']
    },
    profile_img: {
        type: String,
        trim: true,
        default: 'default.jpg'
    },
    birth_date: {
        type: Date,
    },
    state: {
        type: String,
        trim: true,
    },
    country: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
        maxlength: [1000, 'Description cannot exceed 1000 characters'],
        default: null
    },
    Social_links: {
        facebook: {
            type: String,
            trim: true,
            match: [urlRegex, 'Please provide a valid URL for facebook'],
            default: null
        },
        twitter: {
            type: String,
            trim: true,
            match: [urlRegex, 'Please provide a valid URL for twitter'],
            default: null
        },
        linkedin: {
            type: String,
            trim: true,
            match: [urlRegex, 'Please provide a valid URL for linkedin'],
            default: null
        }
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

// Indexes: ensure uniqueness where appropriate
TutorSchema.index({ email: 1 }, { unique: true, sparse: false });
TutorSchema.index({ phone1_no: 1 }, { unique: true, sparse: false });
TutorSchema.index({ phone2_no: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('Tutor', TutorSchema);
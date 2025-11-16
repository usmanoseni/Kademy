const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    },
    address: {
        type: String
    },
    phone_no: {
        type: String,
        unique: true,
    },
    role: {
    type: String,
    enum: ['admin', 'tutor', 'Sudent'],
    default: Null,
    },
    profile_img: {
        type: String,
        default: 'default.jpg',
    },
    birth_date: {
        type: date,
    },
    school: {
        type: String,
    },
    course_of_study: {
        ref: ['Course'],
        type: mongoose.Schema.Types.ObjectId,
    }

}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
    content_title: {
        type: String,
        trim: true,
    },
    content_description: {
        type: String,
        trim: true,
    },
    viewCount: {
        type: Number,
        default: 0,
    },
    rate: {
        type: Number,
        default: 0,
    },
    tutor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tutor',
    },
    subject_name: {
        type: String,
        trim: true,
    },
    content_url: {
        type: String,
        trim: true,
    },
    content_video: {
        type: String,
        trim: true,
        default: null,
    },
    content_doc: {
        type: String,
        trim: true,
        default: null,
    }
}, { timestamps: true })

module.exports = mongoose.model('Content', ContentSchema)
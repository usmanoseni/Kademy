const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    content_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Content',
        required: true
    },
    comments: [
        {
            user_id: { // who made the comment (student or tutor)
                type: mongoose.Types.ObjectId,
                required: true,
                refPath: 'comments.userModel' // dynamic reference to the sibling field
            },
            userModel: { // specifies which collection the user_id refers to
                type: String,
                required: true,
                enum: ['Student', 'Tutor']
            },
            comment_context: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);

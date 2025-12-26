const mongoose = require('mongoose');

const historySchema = new mongoose.Schema(
    {
        student_id: {
            type: mongoose.Types.ObjectId,
            ref:'Student',
            require: true
        },
        histories: [
        {
            history_id: {
                type: Number,
                required: true
            },
            content_id: {
                type: mongoose.Types.ObjectId,
                ref: 'Content',
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    },{timestamps: true}
)

module.exports = mongoose.model("History", historySchema)
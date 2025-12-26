const express = require('express');
const mongoose = require('mongoose');
const Comment = require('../models/comment');
const router = express.Router();

// Post a new sub-comment for a content
router.post('/content/:content_id', async (req, res, next) => {
    try {
        const contentId = req.params.content_id;
        if (!mongoose.Types.ObjectId.isValid(contentId)) {
            return res.status(400).json({ error: 'Invalid content_id' });
        }

        const { user_id, userModel, comment_context } = req.body;
        if (!user_id || !userModel || !comment_context) {
            return res.status(400).json({ error: 'Missing required fields: user_id, userModel, comment_context' });
        }

        let commentDoc = await Comment.findOne({ content_id: contentId });
        const subcomment = { user_id, userModel, comment_context };

        if (commentDoc) {
            commentDoc.comments.push(subcomment);
            await commentDoc.save();
        } else {
            commentDoc = new Comment({ content_id: contentId, comments: [subcomment] });
            await commentDoc.save();
        }

        res.status(201).json(commentDoc);
    } catch (err) {
        next(err);
    }
});

// Get all comments for a content id (sorted by subcomment createdAt desc)
router.get('/content/:content_id', async (req, res, next) => {
    try {
        const contentId = req.params.content_id;
        if (!mongoose.Types.ObjectId.isValid(contentId)) {
            return res.status(400).json({ error: 'Invalid content_id' });
        }

        const commentDoc = await Comment.findOne({ content_id: contentId }).lean();
        if (!commentDoc) return res.status(200).json([]);

        const sortedComments = (commentDoc.comments || []).slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.status(200).json(sortedComments);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
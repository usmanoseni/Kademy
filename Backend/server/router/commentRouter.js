const express = require('express');
const mongoose = require('mongoose');
const Comment = require('../models/comment');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');

// Post a new sub-comment for a content
router.post('/:content_id', requireAuth, async (req, res, next) => {
    try {
        const contentId = req.params.content_id;
        if (!mongoose.Types.ObjectId.isValid(contentId)) {
            return res.status(400).json({ error: 'Invalid content_id' });
        }

        const { user_id, comment_context } = req.body || {};
        if (!user_id || !comment_context) {
            return res.status(400).json({ error: 'Missing required fields: user_id, comment_context' });
        }

        let commentDoc = await Comment.findOne({ content_id: contentId });
        let nextId = 1;
        if (commentDoc && commentDoc.comments.length > 0) {
        nextId = commentDoc.comments[commentDoc.comments.length - 1].comment_id + 1;
        }

        const subcomment = {
        user_id,
        comment_context,
        comment_id: nextId
        };

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
router.get('/:content_id', requireAuth, async (req, res, next) => {
    try {
        const contentId = req.params.content_id;
        if (!mongoose.Types.ObjectId.isValid(contentId)) {
            return res.status(400).json({ error: 'Invalid content_id' });
        }

        const commentDoc = await Comment.findOne({ content_id: contentId }).lean();
        if (!commentDoc) return res.status(200).json([]);

        const sortedComments = (commentDoc.comments || []).slice().sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        res.status(200).json(sortedComments);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
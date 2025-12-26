const express = require('express');
const contentHistory = require('../models/contentHistory');
const router = express.Router();

// get all content history by student id
router.get('/:student_id', async (req, res, next) => {
    try {
        const studebtId = req.params.student_id
        const findHistory = await (await contentHistory.find({ student_id: studebtId })).sort({ accessed_at: -1 });
        if (!findHistory) {
            return res.status(404).json({ msg: "No history found for this student" });
        }
        res.status(200).json(findHistory)
    } catch (err) {
        next(err)
    }
});

//post a new content history by student id
router.post('/student_id', async (req, res, next) => {
    try {
        const newHistory = new contentHistory(req.body);
        const savedHistory = await newHistory.save();
        res.status(201).json(savedHistory);
    } catch (err) {
        next(err)
    }
});

// delete a content from history
router.delete('/:student_id,:historyid', async (req, res, next) => {
    try {
        const studentId = req.params.student_id;
        const historyId = req.params.historyid;
        const deletedHistory = await contentHistory.findOneAndDelete({ _id: historyId, student_id: studentId });
        if (!deletedHistory) {
            return res.status(404).json({ msg: "History not found" });
        }
        res.status(200).json({ msg: "History deleted successfully" });
    }catch (err) {
        next(err)
    }
})

// delete all content history by student id
router.delete('/:student_id', async (req, res, next) => {
    try {
        const studentId = req.params.student_id;
        const deletedHistories = await contentHistory.deleteMany({ student_id: studentId });
        if (deletedHistories.deletedCount === 0) {
            return res.status(404).json({ msg: "No history found for this student" });
        }
        res.status(200).json({ msg: "All history deleted successfully" });
    } catch (err) {
        next(err)
    }
});

module.exports = router;
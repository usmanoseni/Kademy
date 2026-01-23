const express = require('express');
const contentHistory = require('../models/contentHistory');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');
const { body, validationResult } = require('express-validator');

// get all content history by student id
router.get('/:student_id', requireAuth, async (req, res, next) => {
    try {
        const studebtId = req.params.student_id
        const findHistory = await contentHistory.findOne({ student_id: studebtId })
        if (!findHistory) {
            return res.status(404).json({ msg: "No history found for this student" });
        }
        res.status(200).json(findHistory)
    } catch (err) {
        next(err)
    }
});

//post a new content history by student id
router.post('/:student_id',
[
  body('histories').isArray({ min: 1 }).withMessage('Histories must be a non-empty array'),
  body('histories.*.content_id').notEmpty().withMessage('Content ID is required'),
],
requireAuth,
async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const studentId = req.params.student_id;

    // Find existing history document
    let existingHistory = await contentHistory.findOne({ student_id: studentId });

    // If none → create new
    if (!existingHistory) {
      const historiesWithIds = req.body.histories.map((h, index) => ({
        content_id: h.content_id,
        history_id: index + 1
      }));

      const newHistory = new contentHistory({
        student_id: studentId,
        histories: historiesWithIds
      });

      const saved = await newHistory.save();
      return res.status(201).json(saved);
    }

    // If exists → append
    let lastId = existingHistory.histories.length > 0
      ? existingHistory.histories[existingHistory.histories.length - 1].history_id
      : 0;

    const newHistories = req.body.histories.map(h => {
      lastId++;
      return {
        content_id: h.content_id,
        history_id: lastId
      };
    });

    existingHistory.histories.push(...newHistories);
    const updated = await existingHistory.save();

    res.status(201).json(updated);

  } catch (err) {
    next(err);
  }
});

router.delete('/:student_id/:historyid', requireAuth, async (req, res, next) => {
  try {
    const studentId = req.params.student_id;
    const historyId = Number(req.params.historyid);
    // Find student's history document
    const studentHistory = await contentHistory.findOne({ student_id: studentId });
    if (!studentHistory) {
      return res.status(404).json({ msg: "Student history not found" });
    }
    // Remove the selected history
    const filteredHistories = studentHistory.histories.filter(
      h => h.history_id !== historyId
    );
    if (filteredHistories.length === studentHistory.histories.length) {
      return res.status(404).json({ msg: "History ID not found" });
    }
    // Reassign history_id sequentially
    const reindexedHistories = filteredHistories.map((h, index) => ({
      ...h.toObject(),
      history_id: index + 1
    }));
    studentHistory.histories = reindexedHistories;
    await studentHistory.save();
    res.status(200).json({ msg: "History deleted and IDs updated successfully" });
  } catch (err) {
    next(err);
  }
});


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
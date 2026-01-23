const express = require('express');
const Subject = require('../models/Subject');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// get all subjects by category
router.get('/:course_type', async (req, res, next) => {
    try {
        const course_type = req.params.course_type;
        const findSubjects = await Subject.find({
                course_type: { $in: [course_type, 'General'] }
         })
        res.status(200).json(findSubjects)
    } catch (err) {
        next(err)
    }
});

//post a new subject
router.post('/',
    [
        body('subject_name').not().isEmpty().withMessage('Subject name is required'),
        body('course_type').not().isEmpty().withMessage('Course type is required'),
    ],
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              
                return res.status(400).json();
            }
            const newSubject = new Subject(req.body);
            const savedSubject = await newSubject.save();
            res.status(201).json(savedSubject);
        } catch (err) {
            next(err)
        }
    });

//delete subject by id
router.delete('/:id', async (req, res, next) => {
    try {
        const userId = req.params.id;
        const deletedSubject = await Subject.findByIdAndDelete(userId);
        if (!deletedSubject) {
            return res.status(404).json({ msg: "Subject not found" });
        }
        res.status(200).json(deletedSubject)
    } catch (err) { 
        next(err)
    }
})

module.exports = router;

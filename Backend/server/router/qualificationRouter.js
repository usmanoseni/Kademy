const express = require('express');
const qualification = require('../models/Qualification');
const { body } = require('express-validator');
const router = express.Router();

//post qualification 
router.post('/:id', [
    body('institution').not().isEmpty().withMessage('Institution name is required'),
    body('other').optional().isString().withMessage('Other details must be a string'),
    body('certificate1_img').not().isEmpty().withMessage('Certificate image is required'),
    body('certificate2_img').optional().isString().withMessage('Certificate image must be a string')
], async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const userId = req.params.id;
        const newQualification = {
            ...req.body,
            tutor_id: userId
        }
        const qualification = new qualification(newQualification);
        const savedQualification = await qualification.save();
        res.status(201).json(savedQualification);
    } catch (err) {
        next(err)
    }
});

//delete qualification by id
router.delete('/:id', async (req, res, next) => {
    try {
        const userId = req.params.id;
        const deletedQualification = await Subject.findByIdAndDelete(userId);
        if (!deletedQualification) {
            return res.status(404).json({ message: 'Qualification not found' });
        }
        res.status(200).json({ message: 'Qualification deleted successfully' });
    } catch (err) {
        next(err)
    }
});


module.exports = router;


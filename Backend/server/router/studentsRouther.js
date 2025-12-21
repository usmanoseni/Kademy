const express = require('express');
const Student = require('../models/Student')
const router = express.Router();

// get all students by id
router.get('/:id', async (req, res, next) => {
    try {
        const userId = req.params.id;
        const findUser = await Student.findById(userId)
        res.status(200).json(findUser)
    }
    catch (err) {
        next(err)
    }
});

// post a new student
router.post('/',
    [
        body('Fname').not().isEmpty().withMessage('Name is required'),
        body('Lname').not().isEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('profile_img').optional().isString().withMessage('Profile image must be a string'),
        body('address').optional().isString().withMessage('Address must be a string'),
        body('phone_no').optional().isString().withMessage('Phone number must be a string'),
        body('birth_date').optional().isISO8601().toDate().withMessage('Birth date must be a valid date'),
    ],
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const newStudent = new Student(req.body);
            const savedStudent = await newStudent.save();
            res.status(201).json(savedStudent);
        }
        catch (err) {
            next(err)
        }
    })
       
module.exports = router;

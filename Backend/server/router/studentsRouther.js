const express = require('express');
const Student = require('../models/Student')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const hashpassword = require('../middleware/utlis/hashPassword');


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
        body('email').isEmail().withMessage('Valid email is required'),
        body('profile_img').optional().isString().withMessage('Profile image must be a string'),
        body('address').optional().isString().withMessage('Address must be a string'),
        body('phone_no').optional().isString().withMessage('Phone number must be a string'),
        body('birth_date').optional().isISO8601().toDate().withMessage('Birth date must be a valid date'),
        body('state').optional().isString().withMessage('State must be a string'),
        body('country').optional().isString().withMessage('Country must be a string'),
        body('enrolled_courses').not().isEmpty().withMessage('Course type is required'),
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

//Updating the  the student details
router.put('/:id',
        [
        body('Fname').not().isEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('profile_img').optional().isString().withMessage('Profile image must be a string'),
        body('address').optional().isString().withMessage('Address must be a string'),
        body('phone_no').optional().isString().withMessage('Phone number must be a string'),
        body('birth_date').optional().isISO8601().toDate().withMessage('Birth date must be a valid date'),
        body('state').optional().isString().withMessage('State must be a string'),
        body('country').optional().isString().withMessage('Country must be a string'),
        body('enrolled_courses').not().isEmpty().withMessage('Course type is required'),
    ],
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const updateStudent = await Student.findByIdAndUpdate(
                req.params.id,
                req.body,
                 { new: true, validationResult: true });
            if(!updateStudent){
                res.status(400).json({msg:"the student not found"})
            }
            res.status(201).json(updateStudent);    
        
    } catch (err) {
        next(err)
    }
})

//patching the student details
router.patch('/:id',
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    async (req, res, next) => { 
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
        const {password} = req.body;
        if(password){
            return res.status(400).json({msg:"Password cannot be updated using this route"})
        }
        const hashPassword = await hashpassword(password);
        const updateStudent = await Student.findByIdAndUpdate(
            req.params.id,
            {password: hashPassword},
            { new: true, validationResult: true }
        )
        if (!updateStudent) {
            res.status(400).json({msg:"the student not found"})
        }
        res.status(201).json(updateStudent);
    } catch (err) {
        next(err)
    }
})

//deleting a student
router.delete('/:id', async (req, res, next) => {
    try {
        const studentIndex = req
        const deleteStudent = await Sudent.findByIdandDelete(studentIndex);
        if (!deleteStudent) {
            res.status(400).json({ msg: "the student not found" })
        } else {
            res.status(201).json({ msg: "Student was deleted sucessfully" })
        }
        
    } catch (err) {
        next(err)
    }
});
       
module.exports = router;

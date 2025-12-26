const express = require('express');
const Tutor = require('../models/Tutor');
const { body } = require('express-validator');
const router = express.Router();

// get all tutors by id
router.get('/:id', async (req, res, next) => {
    try {
        const userId = req.params.id;
        const findUser = await Tutor.findById(userId)
        res.status(200).json(findUser)
    }
    catch (err) {
        next(err)
    }
});

//post a new  tutor
router.post('/',
    [
        body('Fname').not().isEmpty().withMessage('Name is required'),
        body('Lname').not().isEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ],
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const newTutor = new Tutor(req.body);
            const savedTutor = await newTutor.save();
            res.status(201).json(savedTutor);
        }
        catch (err) {
            next(err)
        }
    });

//update the tutor
router.put('/:id', async (req, res, next) => {
    try {
        const tutorIndex = Tutor.findIndex((user) => user.id == req.params.id)
        if (tutorIndex) {
            const updateTutor = await { ...Tutor[tutorIndex], ...req.body };
            Tutor[tutorIndex] = updateTutor 
            res.status(201).json(updateTutor)
        } else {
            res.staus(201).json({ msg: "tutor not found" })
        }
    } catch (err) {
        next(err)
    }
}) 
// delete tutor by id
router.delete('/:id', async (req, res, next) => { 
    try {
        const userId = Tutor.findIndex((user)=>user.id==req.params.id);
        const deletedTutor = await Tutor.findByIdAndDelete(userId);
        if (!deletedTutor) { 
            res.status(404).json({ message: 'Tutor not found' });
        }
    }  catch (err) {
        next(err)
    }
})

module.exports = router;
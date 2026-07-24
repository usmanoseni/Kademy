const express = require('express');
const Student = require('../models/Student')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { requireAuth } = require('../middleware/authMiddleware');
const hash_password = require('../middleware/utlis/hashPassword');


// get all students
router.get('/all', async (req, res, next) => {
    try {
        const findUser = await Student.find({})
        res.status(200).json(findUser)
    }
    catch (err) {
        next(err)
    }
});

// get all students by id
router.get('/:id', requireAuth, async (req, res, next) => {
    try {
        const userId = req.params.id;
        const findUser = await Student.findById(userId)
        res.status(200).json(findUser)
    }
    catch (err) {
        next(err)
    }
});

// patch the student details
router.patch('/:id', requireAuth,
    [
        body('profile_img').optional().isString().withMessage('Profile image must be a string'),
        body('address').optional().isString().withMessage('Address must be a string'),
        body('phone_no').optional().isString().withMessage('Phone number must be a string'),
        body('birth_date').optional().isISO8601().toDate().withMessage('Birth date must be a valid date'),
        body('state').optional().isString().withMessage('State must be a string'),
        body('country').optional().isString().withMessage('Country must be a string'),
        body('enrolled_courses').optional().isString().withMessage('Course type must be a string'),
        body('school_name').optional().isString().withMessage('School name must be a string')
    ], 
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const updateStudent = await Student.findByIdAndUpdate(
                req.params.id,
                { ...req.body, completeRegistration: true },
                { new: true, runValidators: true }
            );
            if(!updateStudent){
                return res.status(404).json({ msg: "Student not found" });
            }
            res.status(200).json(updateStudent);
        }
        catch (err) {
            next(err)
        }
    })

//Updating the  the student details
router.put('/:id', requireAuth,
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
        body('school_name').optional().isString().withMessage('School name must be a string')
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

//patching the student password
router.patch('/update_password/:id', requireAuth, [
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { password } = req.body;
      if (!password) {
        return res.status(400).json({ msg: "Password is required" });
      }
      
      const hashedPassword = await hash_password.hashpassword(password);

      const updateStudent = await Student.findByIdAndUpdate(
        req.params.id,
        { password: hashedPassword },
        { new: true, runValidators: true }
      );

      if (!updateStudent) {
        return res.status(404).json({ msg: "Student not found" });
      }

      res.status(200).json({
        msg: "Password updated successfully",
        user: {
          id: updateStudent._id,
          Fname: updateStudent.Fname,
          email: updateStudent.email
        }
      });

    } catch (err) {
      next(err);
    }
  }
);


//deleting a student
router.delete('/:id',requireAuth, async (req, res, next) => {
    try {
        const studentIndex = req.params.id;
        const deleteStudent = await Student.findByIdAndDelete(studentIndex);
        if (!deleteStudent) {
            return res.status(404).json({ msg: "Student not found" })
        } else {
            res.status(200).json({ msg: "Student was deleted successfully" })
        }
        
    } catch (err) {
        next(err)
    }
});
       
module.exports = router;

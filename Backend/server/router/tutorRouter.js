const express = require('express');
const Tutor = require('../models/Tutor');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');
const hash_password = require('../middleware/utlis/hashPassword');  

// get all tutors by id
router.get('/:id', requireAuth, async (req, res, next) => {
    try {
        const userId = req.params.id;
        const findUser = await Tutor.findById(userId)
        res.status(200).json(findUser)
    }
    catch (err) {
        next(err)
    }
});

//patch tutor details
router.patch('/:id', requireAuth,
        [
        body('profile_img').optional().isString().withMessage('Profile image must be a string'),
        body('address').optional().isString().withMessage('Address must be a string'),
        body('phone1_no').optional().isString().withMessage('Primary phone must be a string'),
        body('phone2_no').optional().isString().withMessage('Secondary phone must be a string'), 
        body('birth_date').optional().isISO8601().toDate().withMessage('Birth date must be a valid date'),
        body('state').optional().isString().withMessage('State must be a string'),
        body('country').optional().isString().withMessage('Country must be a string'),
        body('description').optional().isString().withMessage('Description must be a string'),
        body('social_links.facebook').optional().isString().withMessage('Facebook link must be a string'),
        body('social_links.twitter').optional().isString().withMessage('Twitter link must be a string'),
        body('social_links.linkedin').optional().isString().withMessage('LinkedIn link must be a string'),

    ], 
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const updateTutor = await Tutor.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            if (!updateTutor) {
                return res.status(404).json({ msg: "Tutor not found" });
            }
            res.status(200).json(updateTutor);
        }
        catch (err) {
            next(err)
        }
    });

    //patching the tutor password
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
    
          const updateTutor = await Tutor.findByIdAndUpdate(
            req.params.id,
            { password: hashedPassword },
            { new: true, runValidators: true }
          );
    
          if (!updateTutor) {
            return res.status(404).json({ msg: "Tutor not found" });
          }
    
          res.status(200).json({
            msg: "Password updated successfully",
            user: {
              id: updateTutor._id,
              Fname: updateTutor.Fname,
              email: updateTutor.email
            }
          });
    
        } catch (err) {
          next(err);
        }
      }
    );

//update the tutor (full replacement)
router.put('/:id', requireAuth,       [
        body('profile_img').optional().isString().withMessage('Profile image must be a string'),
        body('address').optional().isString().withMessage('Address must be a string'),
        body('phone1_no').optional().isString().withMessage('Primary phone must be a string'),
        body('phone2_no').optional().isString().withMessage('Secondary phone must be a string'), 
        body('birth_date').optional().isISO8601().toDate().withMessage('Birth date must be a valid date'),
        body('state').optional().isString().withMessage('State must be a string'),
        body('country').optional().isString().withMessage('Country must be a string'),
        body('description').optional().isString().withMessage('Description must be a string'),
        body('social_links.facebook').optional().isString().withMessage('Facebook link must be a string'),
        body('social_links.twitter').optional().isString().withMessage('Twitter link must be a string'),
        body('social_links.linkedin').optional().isString().withMessage('LinkedIn link must be a string'),

    ], async (req, res, next) => {
    try {
        const updateTutor = await Tutor.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updateTutor) {
            return res.status(404).json({ msg: "Tutor not found" });
        }
        res.status(200).json(updateTutor);
    } catch (err) {
        next(err)
    }
}) 
// delete tutor by id
router.delete('/:id', requireAuth, async (req, res, next) => { 
    try {
        const deletedTutor = await Tutor.findByIdAndDelete(req.params.id);
        if (!deletedTutor) { 
            return res.status(404).json({ msg: "Tutor not found" });
        }
        res.status(200).json({ msg: "Tutor deleted successfully" });
    } catch (err) {
        next(err)
    }
})

module.exports = router;
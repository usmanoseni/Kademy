const express = require('express');
const Content = require('../models/Content');
const {body, validationResult} = require('express-validator');
const router = express.Router();
const {requireAuth} = require('../middleware/authMiddleware');


// get all contents base on student enrolleed_courses
router.get('/dashboard/:student_id', requireAuth, async (req, res, next) => { 
    try {
        // Assuming you have a Student model to get enrolled courses
        const Student = require('../models/Student');
        const subjects = require('../models/Subject');
        const userId  = await Student.findById({ _id: req.params.student_id }).select('enrolled_courses').lean();
        if(!userId){
            return res.status(404).json({ message: 'Student not found' });
        }
        const enrolledCourses = userId.enrolled_courses;
        if (enrolledCourses == null) {
            return res.status(404).json({ message: 'No enrolled courses found for this student' });
        }
        const getAllSubjects = await subjects.find({course_type: { $in: [enrolledCourses, 'General'] }}).lean();
        const subjectNameList = getAllSubjects.map(sub => sub.subject_name);
        console.log("Subject Names:", subjectNameList);

        // Fetch contents based on subject names
        const contents = await Content.find({ subject_name: { $in: subjectNameList } });
        res.status(200).json(contents);
    } catch (err) {
        next(err);
    }
})


// get all content posted by the tutor 
router.get('/:tutor_id', requireAuth, async (req, res, next) => {
    try {
        const userId = req.params.tutor_id;
        const findUserContent = await Content.find({ tutor_id: userId })
        if (!findUserContent) {
            return res.status(404).json({ message: 'No content found for this tutor' });
        }
        res.status(200).json(findUserContent)
    }
    catch (err) {
        next(err)
    }
});

//get content by search query from the  words contain in the title 
router.get('/', requireAuth, async (req, res, next) => {
    try {
        const { search_query } = req.query;
        if (!search_query) { return res.status(400).json({ message: 'Search parameters not found' }); }
         
        const results = await Content.find(
            {
                "$or": [
                    { content_title: { $regex: search_query, $options: 'i' } },
                    { subject_name: { $regex: search_query, $options: 'i' } }
                ]
            }
        )
        console.log("Search Query:", req.query.search_query);
        res.status(200).json(results)
    }
    catch (err) {
        next(err)
    }
});

//post a new content
router.post('/:tutor_id', requireAuth,
    [
        body('content_title').not().isEmpty().withMessage('Content title is required'),
        body('content_description').not().isEmpty().withMessage('Content description is required'),
        body('subject_name').not().isEmpty().withMessage('Subject ID is required'),
        body('content_url').not().isEmpty().withMessage('Content URL is required'),
        body('content_video').optional().isString().withMessage('Content video must be a string'),
        body('content_doc').optional().isString().withMessage('Content document must be a string'),
    ],
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const newContent = new Content({
                ...req.body,
                tutor_id: req.params.tutor_id
            });
            await newContent.save();
            res.status(200).json(newContent)
        } catch (err) {
            next(err)
        }
});

// delete content by id
router.delete('/:id', requireAuth, async (req, res, next) => {
    try {
        const contentId = req.params.id;
        const deletedContent = await Content.findByIdAndDelete(contentId);
        if (!deletedContent) {
            return res.status(404).json({ message: 'Content not found' });
        }
        res.status(200).json({ message: 'Content deleted successfully' });
    } catch (err) {
        next(err);
    }
}); 

module.exports = router;
const express = require('express');
const Content = require('../models/Content');
const {body, validationResult} = require('express-validator');
const router = express.Router();

// get all contents
router.get('/', async (req, res, next) => {
    try {
        const content = await Content.find()
        res.status(200).json(content)
    }
    catch (err) {
        next(err)
    }
});

// get all content posted by the tutor 
router.get('/:id', async (req, res, next) => {
    try {
        const userId = req.params.id;
        const findUserContent = await Content.find({ tutor_id: userId })
        res.status(200).json(findUserContent)
    }
    catch (err) {
        next(err)
    }
});

//get content by search query from the  words contain in the title 
router.get('/', async (req, res, next) => {
    try {
        const { search_query } = req.query;
        if (!search_query) { return res.status(400).json({ message: 'Search parameters not found' }); }
         
        const results = await Content.find(
            {
                "$or": [
                    { content_title: { $regex: search_query, $options: 'i' } },
                    { subject_name: search_query, $options: 'i' }
                ]
            }
        )
        res.status(200).json(results)
    }
    catch (err) {
        next(err)
    }
});

//post a new content
router.post('/',
    [
        body('content_title').not().isEmpty().withMessage('Content title is required'),
        body('content_description').not().isEmpty().withMessage('Content description is required'),
        body('tutor_id').not().isEmpty().withMessage('Tutor ID is required'),
        body('subject_id').not().isEmpty().withMessage('Subject ID is required'),
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
            const newContent = new Content(req.body);
            await newContent.save();
            res.status(200).json(newContent)
        } catch (err) {
            next(err)
        }
});

// delete content by id
router.delete('/:id', async (req, res, next) => {
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
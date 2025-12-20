const mongoose = require('mongoose');

// Allow common characters found in institution names: letters, numbers, spaces and .,&-'()
const institutionNameRegex = /^[a-zA-Z0-9\s\.\,\&\-\'\(\)]+$/;
const imageRegex = /^(https?:\/\/.+\.(?:png|jpg|jpeg|gif|svg)|[\w,\s\-]+\.(?:png|jpg|jpeg|gif|svg))$/i;

const QualificationSchema = new mongoose.Schema({
    Institution: {
        type: String,
        trim: true,
        minlength: [3, 'Institution name must be at least 3 characters long'],
        maxlength: [150, 'Institution name cannot exceed 150 characters'],
        match: [institutionNameRegex, 'Institution name contains invalid characters']
    },
    other: {
        type: String,
        trim: true,
        default: null,
        minlength: [3, 'Other qualification name must be at least 3 characters long'],
        maxlength: [100, 'Other qualification name cannot exceed 100 characters'],
        match: [institutionNameRegex, 'Other qualification name contains invalid characters']
    },
    certificate1_img: {
        type: String,
        trim: true,
        default: 'no_img.jpg',
        match: [imageRegex, 'Certificate1 image must be a valid image filename or URL']
    },
    certificate2_img: {
        type: String,
        trim: true,
        default: 'no_img.jpg',
        match: [imageRegex, 'Certificate2 image must be a valid image filename or URL']
    },
    tutor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tutor',
        required: [true, 'Qualification must be associated with a tutor']
    }
}, { timestamps: true });

// Ensure at least one qualification field is provided before saving
QualificationSchema.pre('validate', function(next) {
    if ( !this.Institution && !this.other) {
        return next(new Error('At least one qualification field (Institution, or other) must be provided'));
    }
    return next();
});

// Index tutor_id for fast lookups. Do not make unique to allow multiple qualification documents per tutor if desired.
QualificationSchema.index({ tutor_id: 1 });

module.exports = mongoose.model('Qualification', QualificationSchema);
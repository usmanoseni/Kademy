const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    Course_type: {
        type: Number,
        required: true,
    }
})

const DepartmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a department name"],
        unique: true,
        trim: true
    },
    subjects: [SubjectSchema]
}, { timestamps: true });

module.exports = mongoose.model("Department", DepartmentSchema);
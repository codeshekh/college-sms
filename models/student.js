const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String },
    phone: { type: String },
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;

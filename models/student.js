const mongoose = require("mongoose");

// student schema
const studentSchema = mongoose.Schema({
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String },
    phone: { type: String },
});

// define and export
module.exports = mongoose.model("Student", studentSchema);

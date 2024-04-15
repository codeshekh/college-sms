const mongoose = require("mongoose");
const Student = require('./models/student');

// Set default Promise library to global
mongoose.Promise = global.Promise;

// Connect to the database
mongoose.connect(MongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Database connected');
}).catch((err) => {
    console.error('Error connecting to database:', err);
});

// Add student
const AddStudent = (studentData) => {
    Student.create(studentData).then((student) => {
        console.info("New student added:", student);
    }).catch((err) => {
        console.error("Error adding student:", err);
    });
}

// Find student
const FindStudent = (name) => {
    // Make search case insensitive
    const search = new RegExp(name, 'i');
    Student.find({ $or: [{ firstname: search }, { lastname: search }] }).then((students) => {
        console.info(students);
        console.info(`${students.length} matches`);
    }).catch((err) => {
        console.error("Error finding student:", err);
    });
}

// Update Student
const UpdateStudent = (_id, studentData) => {
    Student.updateOne({ _id }, studentData).then((result) => {
        console.info('Student updated');
    }).catch((err) => {
        console.error("Error updating student:", err);
    });
}

// Remove Student
const RemoveStudent = (_id) => {
    Student.deleteOne({ _id }).then((result) => {
        console.info('Student removed');
    }).catch((err) => {
        console.error("Error removing student:", err);
    });
}

// List Student
const ListStudents = () => {
    Student.find().then((students) => {
        console.info(students);
        console.info(`${students.length} students`);
    }).catch((err) => {
        console.error("Error listing students:", err);
    });
}

// Export all methods
module.exports = {
    AddStudent,
    FindStudent,
    UpdateStudent,
    RemoveStudent,
    ListStudents,
};

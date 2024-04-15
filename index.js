const mongoose = require('mongoose');
const Student = require('./models/student');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/workerlist', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Database connected');
}).catch((err) => {
    console.error('Error connecting to database:', err);
    process.exit(1);
});

const AddStudent = (studentData) => {
    Student.create(studentData).then((student) => {
        console.info('New student added:', student);
    }).catch((err) => {
        console.error('Error adding student:', err);
    });
}

const FindStudent = (name) => {
    const search = new RegExp(name, 'i');
    Student.find({ $or: [{ firstname: search }, { lastname: search }] }).then((students) => {
        console.info(students);
        console.info(`${students.length} matches`);
    }).catch((err) => {
        console.error('Error finding student:', err);
    });
}

const UpdateStudent = (_id, studentData) => {
    Student.updateOne({ _id }, studentData).then((result) => {
        console.info('Student updated');
    }).catch((err) => {
        console.error('Error updating student:', err);
    });
}

const RemoveStudent = (_id) => {
    Student.deleteOne({ _id }).then((result) => {
        console.info('Student removed');
    }).catch((err) => {
        console.error('Error removing student:', err);
    });
}

const ListStudents = () => {
    Student.find().then((students) => {
        console.info(students);
        console.info(`${students.length} students`);
    }).catch((err) => {
        console.error('Error listing students:', err);
    });
}

module.exports = {
    AddStudent,
    FindStudent,
    UpdateStudent,
    RemoveStudent,
    ListStudents,
};

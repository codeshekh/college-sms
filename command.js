#!/usr/bin/env node


// Use dynamic import for inquirer
import('inquirer').then(({ createPromptModule }) => {
    const { Command } = require('commander');
    const { AddStudent, FindStudent, UpdateStudent, RemoveStudent, ListStudents } = require('./index.js');

    const prompt = createPromptModule();

    const questions = [
        { type: 'input', name: 'firstname', message: 'Student firstname' },
        { type: 'input', name: 'lastname', message: 'Student lastname' },
        { type: 'input', name: 'email', message: 'Student email' },
        { type: 'input', name: 'phone', message: 'Student phone number' },
    ];

    // Create a new commander Command
    const program = new Command();

    program
        .version('1.0.0')
        .description('Student Management System');

    program
        .command('add')
        .alias('a')
        .description('Add a new student')
        .action(() => {
            prompt(questions).then((answers) => AddStudent(answers));
        });

    program
        .command('update <_id>')
        .alias('u')
        .description('Update a student by ID')
        .action((_id) => {
            prompt(questions).then((answers) => UpdateStudent(_id, answers));
        });

    program
        .command('find <name>')
        .alias('f')
        .description('Find a student by name')
        .action((name) => {
            FindStudent(name);
        });

    program
        .command('remove <_id>')
        .alias('r')
        .description('Remove a student by ID')
        .action((_id) => {
            RemoveStudent(_id);
        });

    program
        .command('list')
        .alias('l')
        .description('List all students')
        .action(() => {
            ListStudents();
        });

    program.parse(process.argv);
});

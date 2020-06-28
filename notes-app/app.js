const chalk = require('chalk');
const yargs = require('yargs');
const getNotes = require('./notes');

yargs.version('1.1.0');

//create add command

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    handler: function () {
        console.log('Add a new note');
    },
});

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: function () {
        console.log('Remove a note');
    },
});

yargs.command({
    command: 'list',
    describe: 'Listing out all the notes',
    handler: function () {
        console.log('Listing out all the notes');
    },
});

yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler: function () {
        console.log('Read a note');
    },
});

console.log(yargs.argv);

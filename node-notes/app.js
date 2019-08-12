const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');
const prompts = require('prompts');

console.clear();
console.log(chalk.green.inverse('Node Notes'));

// ADD
yargs.command('add', 'Add a note', {
    title: {
      describe: 'The title of the note',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: "The body of the note",
      demandOption: true,
      type: 'string',
    }
  },
  (argv) => {
    notes.add(argv.title, argv.body);
  }
)


// REMOVE
yargs.command('remove', 'Remove the note', {
    index: {
      describe: 'The index of the note to delete',
      demandOption: true,
      type: 'integer'
    }
  },
  async function (argv) {
    const note = notes.readNote(argv.index).title;

    let response = await prompts({
      type: 'confirm',
      name: 'value',
      message: `Are you sure you want to remove: ${note}`,
      initial: true
    });

    // Check if the list is empty
    if (response.value) {
      notes.removeNote(argv.index);
    } else {
      console.log('Note not removed')
    }
  }
)

// LIST
// if no notes, do not list anyting
yargs.command('list', 'List all notes',
  function () {
    console.log(chalk.inverse.white('Notes List'))
    debugger;
    notes.listNotes();
  }
)

// READ
// note not found message if no such index
yargs.command('read', 'Read the note', {
    index: {
      describe: 'The index of the note to read',
      demandOption: true,
      type: 'integer'
    }
  },
  (argv) => {
    const note = notes.readNote(argv.index)
    console.log(note.title, note.body);
  }
)

// CLEAR ALL
yargs.command('clear', 'Remove all notes', {},
  async function () {
    let response = await prompts({
      type: 'confirm',
      name: 'value',
      message: `Are you sure you want to remove all notes?`,
      initial: true
    });

    if (response.value) {
      notes.clearAll();
      console.log('All notes cleared')
    }
  }
)

// EDIT
// yargs.command('edit', 'Edit the note', {
//     index: {
//       describe: 'The index of the note to edit',
//       demandOption: true,
//       type: 'integer'
//     }
//   },
//   (argv) => {
//     const note = notes.readNote(argv.index)
//     console.log(note.title, note.body);
//   }
// )

yargs.parse()
const fs = require('fs');
const uuid = require('uuid/v4');
const chalk = require('chalk');

module.exports = {
  add(title, body) {
    const notes = this.getNotes();
    notes.push({
      id: uuid(),
      title,
      body
    });
    this.saveNotes(notes);
    console.log('The note added:', title, body);
  },
  getNotes() {
    try {
      const dataJSON = fs.readFileSync('./notes.json', 'utf8')
      const data = JSON.parse(dataJSON);
      return data;
    } catch (error) {
      return []
    }
  },
  saveNotes(data) {
    const dataJSON = JSON.stringify(data);
    fs.writeFileSync('./notes.json', dataJSON)
  },
  listNotes() {
    const notes = this.getNotes();
    if (notes.length > 0) {
      console.table(notes, ['title', 'body']);
    } else {
      console.log('No notes found')
    }
  },
  removeNote(i) {
    const notes = this.getNotes();
    if (notes.length > 0) {
      notes.splice(i, 1);
      this.saveNotes(notes);
      console.log(chalk.white.inverse('Note deleted!'));
    } else {
      console.log('No notes');
    }
  },
  readNote(i) {
    const notes = this.getNotes();
    if (notes.length < 1) {
      console.log('No notes');
    } else if (i > notes.length) {
      console.log('No such note');
    } else {
      const note = notes[i];
      return note;
    }
  },
  clearAll() {
    let notes = this.getNotes();
    notes = [];
    this.saveNotes(notes);
  }
}
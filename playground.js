////////////////////////////////////////////////////////////////////////////////
// const fs = require('fs');

// let notes = {
//   title: "Note title",
//   body: "Note body",
// }

// let notesJSON = JSON.stringify(notes);

// // fs.writeFile('notes.txt', notesJSON, (err) => console.log(err))
// fs.writeFileSync('notes.txt', notesJSON);

// const buffer = fs.readFileSync('notes.txt');
// const data = JSON.parse(buffer);

// data.title = 'changed title';
// data.body = 'changed body';
// notesJSON = JSON.stringify(data);

// fs.writeFileSync('notes.txt', notesJSON);

////////////////////////////////////////////////////////////////////////////////
// const o = {
//   name: 'name',

//   obj: {
//     name: "Party",
//     list: ['alex', 'tom', 'jen'],
//     parent: this.name,
//     func() {
//       console.log(this.parent);

//     }
//   }
// }

// o.obj.func();


////////////////////////////////////////////////////////////////////////////////
//
// Goal: Create method to get incomplete tasks
//
// 1. Define getTasksToDo method
// 2. Use filter to to return just the incompleted tasks (arrow function)
// 3. Test your work by running the script

// const tasks = {
//     tasks: [{
//         text: 'Grocery shopping',
//         completed: true
//     }, {
//         text: 'Clean yard',
//         completed: false
//     }, {
//         text: 'Film course',
//         completed: false
//     }],
//     getTasksToDo() {
//       return this.tasks.filter(task => !task.completed)
//     }
// }

// console.log(tasks.getTasksToDo())

// const add = (a, b, cb) => {
//     setTimeout(() => {
//         const res = a + b;

//         return cb(res);

//     }, 2000)
// }


// add(1,2,(sum)=>{
//     console.log(sum)
// })

const greeter = (name = 'bob') => {
    console.log('Hi ' + name)
}

greeter('alex')
greeter();
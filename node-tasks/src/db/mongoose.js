const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/node-tasks-api', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})

console.log('db running')


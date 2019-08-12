const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const auth = require('./middleware/auth')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log('Server running on port: ' + port)
});


// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async () => {
//   const task = await Task.findById('5cd5e7d775c18d5e68c3ae64')
//   await task.populate('owner').execPopulate()
//   console.log(task.owner._id)

//   const user = await User.findById('5cd0b0e34413713cd67240de')
//   await user.populate('tasks').execPopulate()
//   console.log(user.tasks)
// }

// main();
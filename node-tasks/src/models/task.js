const mongoose = require('mongoose')
const taskScheme = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",

  }
}, {
  timestamps: true
})

taskScheme.pre('save', async function (next) {
  const task = this
  console.log('pre saving task')
  next()
})

const Task = mongoose.model('Task', taskScheme)

module.exports = Task;
const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  taskName: {
      type: String,
      default: 'study'
  },
  elapsedTime: {
      type: Number,
      min: 0,
      default: 0,
  },
  totalSessions: {
      type: Number,
      min: 0,
      default: 0,
  }
})

const TaskListSchema = new mongoose.Schema({
  taskList: {
      type:[TaskSchema],
  }
})


module.exports = mongoose.model('TaskList', TaskListSchema)
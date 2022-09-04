const mongoose = require('mongoose')

const TaskListSchema = new mongoose.Schema({
  taskList: {
    type: [TaskSchema],
  }
})

const TaskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    default: 'study'
  },
  totalFocusTime: {
    type: Number,
    min: 0,
    default: 0,
  },
  totalSessions: {
    type: Number,
    min: 0,
    default: 0,
  },
  sessions:{
    type: [SessionSchema]
  }
})

const SessionSchema = new mongoose.Schema({
  date:{
    type: Date,
    default: Date.now(),
  },
  todaysFocusTime:{
    type: Number,
    min: 0,
    default: 0,
  },
  todaysBreakTime:{
    type: Number,
    min: 0,
    default: 0, 
  },
  sessionInfo:{
    type: [CycleSchema]
  },
  amountOfCycles:{
    type: Number,
    min: 0,
    default: 0,
  }
})

const CycleSchema = new mongoose.Schema({
  focusTime:{
    type: Number,
    min: 0,
    default: 0, 
  },
  breakTime:{
    type: Number,
    min: 0,
    default: 0, 
  }
})



module.exports = mongoose.model('TaskList', TaskListSchema)
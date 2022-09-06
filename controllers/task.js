const TaskList = require('../models/TaskList')

module.exports = {
  getTime: (req, res) => {
    res.render('pomodoro')
  },
  addTime: (req, res) => {
    console.log('addTime')
  },
  deleteTime: (req, res) => {
    console.log('deleteTime')
  },
  addTask: async (req, res) => {
    try{
      // Will need to update this with the information we need to add to the new task object
      
      const user = await User.find({ _id: req.body.id })
      const { taskArray } = await TaskList.find({ _id: user.taskListId })

      taskArray

      // TaskListSchema: TaskSchema
      // TaskSchema: taskName
      // TaskSchema: totalFocusTime
      // TaskSchema: totalSessions
      // SessionSchema: date
      // SessionSchema: todaysFocusTime
      // SessionSchema: todaysBreakTime
      // SessionSchema: sessionInfo
      // SessionSchema: amountOfCycles
      // CycleSchema: focusTime
      // CycleSchema: breakTime

    }catch(err){
      console.log(err)
    }
  }
}   


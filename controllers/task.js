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
      
      // user: user document
      const user = await User.find({ _id: req.body.id })

      // taskList: task list associated with the user
      const taskList = await TaskList.find({ _id: user.taskListId })

      // currentTask: the task that the user is working on
      const currentTask = taskList.taskArray.find((task) => task.taskName === req.body.taskName)

      // Destructuring taskArray
      let { 
        taskName,
        totalFocusTime,
        totalSessions,
        sessions
       } = taskList.taskArray

      //  Destructuring sessions
       let {
        date,
        todaysFocusTime,
        todaysBreakTime,
        sessionInfo,
        amountOfCycles
      } = sessions


        // taskArray properties
        taskName = req.body.taskName
        totalFocusTime += req.body.focusTime
        totalSessions = sessions.length
        

        date = 
        todaysFocusTime = 
        todaysBreakTime = 
        sessionInfo = 
        amountOfCycles = 

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


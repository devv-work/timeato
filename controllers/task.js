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
       } = currentTask

      //  Destructuring sessions
       let {
        date,
        todaysFocusTime,
        todaysBreakTime,
        sessionInfo,
        amountOfCycles
      } = sessions

      // Destructuring sessionInfo

      let {
        focusTime,
        breakTime
      } = sessionInfo


        // TaskSchema: taskName
        taskName = req.body.taskName

        // TaskSchema: totalFocusTime
        totalFocusTime += req.body.focusTime

        // TaskSchema: totalSessions
        totalSessions = sessions.length
        
        // SessionSchema: date
        date = req.body.date

        // SessionSchema: todaysFocusTime
        todaysFocusTime += req.body.focusTime

        // SessionSchema: todaysBreakTime
        todaysBreakTime = req.body.breakTime
        
        // SessionSchema: amountOfCycles
        amountOfCycles = sessionInfo.length

        // CycleSchema: focusTime
        focusTime = req.body.focusTime

        // CycleSchema: breakTime
        breakTime = req.body.breakTime  

    }catch(err){
      console.log(err)
    }
  }
}   


const User = require('../models/User')
const Task = require('../models/Task')

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
  updateTask: async (req, res) => {
    try {
      // Find the user
      const user = await User.findOne({ _id: req.user.id })
      // access taskArray property
      const { taskArray } = user

      // Search to see if a task exists with the taskName passed through the request
      const currentTask = taskArray.find((task) => task.taskName === req.body.taskName)

      // If the task doesnt exists, create the task
      if (currentTask === undefined) {
        taskArray.push({
          taskName: req.body.taskName,
          totalFocusTime: req.body.focusTime,
          totalSessions: 1,
          sessions: [
            {
              date: req.body.date,
              todaysFocusTime: req.body.focusTime,
              todaysBreakTime: req.body.breakTime,
              sessionInfo: [{
                focusTime: req.body.focusTime, breakTime: req.body.breakTime
              }],
              amountOfCycles: 1
            }
          ]
        })
      } else { // update the task
        // grab properties from the current task
        const { totalFocusTime, totalSessions, sessions } = currentTask
        // updating properties
        totalFocusTime += req.body.focusTime
        totalSessions += 1

        // check to see if the last session was today
        if (sessions[sessions.length - 1].date === req.body.date) {

        } else { // add a new session
          sessions.push({
            date: req.body.date,
            todaysFocusTime: req.body.focusTime,
            todaysBreakTime: req.body.breakTime,
            sessionInfo: [{
              focusTime: req.body.focusTime, breakTime: req.body.breakTime
            }]
          })
        }
      }

      // Save changes in db
      user.save((err) => console.error(err))
    } catch (err) {
      console.error(err)
    }
  }
}

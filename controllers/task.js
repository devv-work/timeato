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
        // push a new task to the taskArray
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
      } else { // if the task did exist update the task
        // grab properties from the current task
        let { totalFocusTime, totalSessions, sessions } = currentTask
        // update the property values
        totalFocusTime += req.body.focusTime
        totalSessions += 1

        const today = sessions[sessions.length - 1]

        // check to see if the last session was today
        if (req.body.date === today) {
          // grab properties from todays session
          let { todaysFocusTime, todaysBreakTime, sessionInfo } = today

          // update property values
          todaysFocusTime += req.body.focusTime
          todaysBreakTime += req.body.breakTime

          // push the current session info
          sessionInfo.push({
            focusTime: req.body.focusTime, breakTime: req.body.breakTime
          })

        } else { // add a new session
          // push a new session to session array
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

const User = require('../models/User')
const Task = require('../models/Task')

module.exports = {
  getTime: async (req, res) => {
    const user = req.user
    // if the uniqueDatesLoggedIn array has a length greater than 1, the user is returning to our app on a new day
    const returningUser = user.uniqueDatesLoggedIn.length > 1

    res.render('pomodoro.ejs', { user, returningUser })
  },
  addTime: (req, res) => {
    console.log('addTime')
  },
  deleteTime: (req, res) => {
    console.log('deleteTime')
  },
  updateTask: async (req, res) => {
    try {
      // current user
      const user = await User.findOne({ _id: req.user.id })
      // access taskArray property from the user
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

        // the last session in a users session array
        const today = sessions[sessions.length - 1]
        // format the request date
        const dateFromReq = formatDate(new Date(req.body.date))

        // check to see if a session has been made for today, if so update that session, otherwise add a new session
        if (formatDate(today.date) === dateFromReq) {
          // grab properties from todays session
          let { todaysFocusTime, todaysBreakTime, sessionInfo } = today

          // update property values
          todaysFocusTime += req.body.focusTime
          todaysBreakTime += req.body.breakTime

          // push the current session info only if session just started (prevents duplicate pushes)
          console.log(sessionInfo)
          if (req.body.elapsedTime === 0 ){
            sessionInfo.push({
              focusTime: req.body.focusTime, breakTime: req.body.breakTime
            })
            console.log(sessionInfo)
          }
         
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

      // add date to uniqueDatesLoggedIn array if the date doesn't exist in the array
      let { uniqueDatesLoggedIn } = user
      const reqDate = formatDate(new Date(req.body.date))
      if(!uniqueDatesLoggedIn.includes(reqDate)) {
        uniqueDatesLoggedIn.push(reqDate)
      }

      // Save changes in db
      user.save()
    } catch (err) {
      console.error({ location: 'try catch updateTask task.js', err })
    }
  }
}

// Converts Date() to mm/dd/yyyy format
function formatDate(date) {
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1; // Months start at 0!
  let dd = date.getDate();
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  const formattedToday = mm + '/' + dd + '/' + yyyy;
  return formattedToday;
}
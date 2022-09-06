const User = require('../models/User')
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
    console.log(req.body)
  },
  updateTask: async (req, res) => {
    try {
      // Find the user
      const user = await User.find({ _id: req.user.id })
      // Find the users taskList

      console.log(user.taskListId)
      const taskList = await TaskList.find({ _id: user.taskListId })

      console.log({ user, taskList })

      // Search to see if a task exists with the taskName passed through the request
      const currentTask = taskList.taskArray.find((task) => task.taskName === req.body.taskName)

      // If the task doesnt exists redirect to /addTask and add the new task to the taskArray
      if (currentTask === undefined) {
        res.redirect('/addTask')
      }



      // Save changes in db
      taskList.save((err) => console.error(err))
    } catch (err) {
      console.error(err)
    }
  }
}

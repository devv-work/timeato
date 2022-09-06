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
    try {
      // Find the user
      const user = await User.find({ _id: req.user.id })
      // Find the users taskList
      const taskList = await TaskList.find({ _id: user.taskListId })

      // Search to see if a task exists with the taskName passed through the request
      const currentTask = taskList.taskArray.find((task) => task.taskName === req.body.taskName)



      // Save changes in db
      taskList.save((err) => console.error(err))
    } catch (err) {
      console.error(err)
    }
  }
}

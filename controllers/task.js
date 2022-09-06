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

      // If the task doesnt exists redirect to /addTask and add the new task to the taskArray
      if (currentTask === undefined) {
        res.redirect('/addTask')
      }



      // Save changes in db
      user.save((err) => console.error(err))
    } catch (err) {
      console.error(err)
    }
  }
}

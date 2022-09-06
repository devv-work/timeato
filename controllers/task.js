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
      await Todo.findOneAndUpdate()
    }catch(err){
      console.log(err)
    }
  }
}   


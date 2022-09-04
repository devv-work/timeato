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
  addTask: (req, res) => {
    try{
      await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile})
    }catch(err){
      console.log(err)
    }
  }
}   


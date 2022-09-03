const TaskList = require('../models/TaskList')

module.exports = {
  getTime: (req, res) => {
    res.render('login')
  },
  addTime: (req, res) => {
    console.log('addTime')
  },
  deleteTime: (req, res) => {
    console.log('deleteTime')
  },
}    

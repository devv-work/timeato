const TaskList = require('../models/TaskList')

module.exports = {
  getTime: (req, res) => {
    res.render('pomorodor')
  },
  addTime: (req, res) => {
    console.log('addTime')
  },
  deleteTime: (req, res) => {
    console.log('deleteTime')
  },
}    
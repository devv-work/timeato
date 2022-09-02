const mongoose = require('mongoose')

const TimeTrackerSchema = new mongoose.Schema({
})

module.exports = mongoose.model('TimeTracker', TimeTrackerSchema)

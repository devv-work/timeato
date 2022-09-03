const mongoose = require('mongoose')

const TaskListSchema = new mongoose.Schema({
    taskList: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        }],
    }
})

const TaskSchema = new mongoose.Schema({
    taskName: {
        type: String,
    },
    elapsedTime: {
        type: Number,
        min: 0,
        default: 0,
    },
    totalSessions: {
        type: Number,
        min: 0,
        default: 0,
    }
})

module.exports = mongoose.model('TaskList', TaskListSchema)
module.exports = mongoose.model('Task', TaskSchema)
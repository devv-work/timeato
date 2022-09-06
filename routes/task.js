const express = require('express')
const router = express.Router()
const taskController = require('../controllers/task')
const { ensureAuth } = require('../middleware/auth')

// Method names are arbitary
router.get('/', ensureAuth, taskController.getTime)
router.post('/addTime', ensureAuth, taskController.addTime)
router.delete('/deleteTime', ensureAuth, taskController.deleteTime)

// Route to adding a new task object to the user 
router.post('/addTask', ensureAuth, taskController.addTask)
router.put('/updateTask', ensureAuth, taskController.updateTask)


//export
module.exports = router

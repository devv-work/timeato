const express = require('express')
const router = express.Router()
const timeTrackerController = require('../controllers/timetracker')
const { ensureAuth } = require('../middleware/auth')

// Method names are arbitary
router.get('/', ensureAuth, timeTrackerController.getTime)
router.post('/addTime', ensureAuth, timeTrackerController.addTime)
router.delete('/deleteTime', ensureAuth, timeTrackerController.deleteTime)

//export
module.exports = router
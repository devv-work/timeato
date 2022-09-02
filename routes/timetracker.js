const express = require('express')
const router = express.Router()
const timeTrackerController = require('../controllers/timetracker')
const { ensureAuth } = require('../middleware/auth')

// Method names are arbitary
router.get('/', timeTrackerController.getTime)
router.post('/addTime', timeTrackerController.addTime)
router.delete('/deleteTime', timeTrackerController.deleteTime)
module.exports = router
const express = require('express')
const router = express.Router()
const timeslotController = require("../controllers/timeslots.controllers.js")
const { verifyToken, checkRole } = require('../middlewares/auth.middleware.js')

router.get('/timeslots', timeslotController.getAllTimeslots)

// Get specific groomer's (by id) specific timeslot id
router.get('/users/:userID/timeslots/:timeslotID', timeslotController.getTimeslotByID)

router.post(
    '/timeslots', 
    verifyToken,
    checkRole(['admin', 'groomer']),
    timeslotController.createTimeslot
)

router.put(
    '/:timeslotID', 
    verifyToken,
    checkRole(['admin', 'groomer']),
    timeslotController.updateTimeslot
)

router.delete(
    '/:timeslotID',
    verifyToken,
    checkRole(['admin', 'groomer']),
    timeslotController.deleteTimeslot
)

module.exports = router
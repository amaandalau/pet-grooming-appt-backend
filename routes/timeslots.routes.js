const express = require('express')
const router = express.Router()
const timeslotController = require("../controllers/timeslots.controllers.js")

router.get('/timeslots', timeslotController.getAllTimeslots)

// Get specific groomer's (by id) specific timeslot id
router.get('/users/:userID/timeslots/:timeslotID', timeslotController.getTimeslotByID)

router.post('/timeslots', timeslotController.createTimeslot)

router.put('/:timeslotID', timeslotController.updateTimeslot)

router.delete('/:timeslotID', timeslotController.deleteTimeslot)

module.exports = router
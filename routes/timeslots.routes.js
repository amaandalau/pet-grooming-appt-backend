const express = require('express')
const router = express.Router()
const timeslotController = require("../controllers/timeslots.controllers.js")
const { verifyToken, checkRole } = require('../middlewares/auth.middleware.js')

router.get('/', timeslotController.getAllTimeslots)

router.get('/users/:userID', timeslotController.getAllTimeslotsByGroomerID)

router.get('/:timeslotID', timeslotController.getTimeslotByID)

router.post(
    '/', 
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
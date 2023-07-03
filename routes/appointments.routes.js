const express = require('express')
const router = express.Router()
const apptController = require("../controllers/appointments.controllers.js")

router.get('/', apptController.getAllAppointments)

router.get('/:apptID', apptController.getApptByID)

router.post('/', apptController.createAppt)

router.put('/:apptID', apptController.updateAppt)

router.delete('/:apptID', apptController.deleteAppt)

module.exports = router
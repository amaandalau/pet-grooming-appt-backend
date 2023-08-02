const express = require('express')
const router = express.Router()
const apptController = require("../controllers/appointments.controllers.js")
const { verifyToken, checkRole } = require('../middlewares/auth.middleware.js')

router.get('/', apptController.getAllAppointments)

router.get('/:apptID', apptController.getApptByID)

router.get('/pet/:petID', apptController.getApptByPetID)

router.post(
    '/', 
    verifyToken,
    checkRole(['admin', 'owner']),
    apptController.createAppt
)

router.put(
    '/:apptID', 
    verifyToken,
    checkRole(['admin', 'owner', 'groomer']),
    apptController.updateAppt
)

router.delete(
    '/:apptID', 
    verifyToken,
    checkRole(['admin', 'owner']),
    apptController.deleteAppt
)

module.exports = router
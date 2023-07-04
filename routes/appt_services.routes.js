const express = require('express')
const router = express.Router()
const apptServicesController = require("../controllers/appt_services.controllers.js")
const { verifyToken, checkRole } = require('../middlewares/auth.middleware.js')

router.get('/', apptServicesController.getAllApptServices)

router.get('/:apptServiceID', apptServicesController.getApptServiceByID)

router.post(
    '/', 
    verifyToken,
    checkRole(['admin', 'owner']),
    apptServicesController.createApptService
)

router.put(
    '/:apptServiceID', 
    verifyToken,
    checkRole(['admin', 'owner']),
    apptServicesController.updateApptService
)

router.delete(
    '/:apptServiceID', 
    verifyToken,
    checkRole(['admin', 'owner']),
    apptServicesController.deleteApptService
)

module.exports = router
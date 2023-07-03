const express = require('express')
const router = express.Router()
const apptServicesController = require("../controllers/appt_services.controllers.js")

router.get('/', apptServicesController.getAllApptServices)

router.get('/:apptServiceID', apptServicesController.getApptServiceByID)

router.create('/', apptServicesController.createApptService)

router.put('/:apptServiceID', apptServicesController.updateApptService)

router.delete('/:apptServiceID', apptServicesController.deleteApptService)


module.exports = router
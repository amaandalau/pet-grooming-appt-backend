const express = require('express')
const router = express.Router()
const serviceController = require("../controllers/services.controllers.js")

router.get('/', serviceController.getAllServices)

router.get('/:serviceID', serviceController.getServicesByID)

router.post('/', serviceController.createService)

router.put('/:serviceID', serviceController.updateService)

router.delete('/:serviceID', serviceController.deleteService)

module.exports = router
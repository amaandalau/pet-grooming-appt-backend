const express = require('express')
const router = express.Router()
const serviceController = require("../controllers/services.controllers.js")
const { verifyToken, checkRole } = require('../middlewares/auth.middleware.js')

router.get('/', serviceController.getAllServices)

router.get('/:serviceID', serviceController.getServicesByID)

router.post(
    '/', 
    verifyToken,
    checkRole(['admin', 'groomer']),
    serviceController.createService
)

router.put(
    '/:serviceID', 
    verifyToken,
    checkRole(['admin', 'groomer']),
    serviceController.updateService
)

router.delete(
    '/:serviceID', 
    verifyToken,
    checkRole(['admin', 'groomer']),
    serviceController.deleteService
)

module.exports = router
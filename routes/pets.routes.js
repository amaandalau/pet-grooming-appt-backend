const express = require('express')
const router = express.Router()
const petController = require("../controllers/pets.controllers.js")
const { verifyToken, checkRole } = require("../middlewares/auth.middleware.js")

router.get('/', petController.getAllPets)

// router.get('/users/:userID/', petController.getPetsByOwnerID)

router.get('/:petID', petController.getPetByID)

router.post(
    '/pets', 
    verifyToken,
    checkRole(['admin', 'owner']),
    petController.createPet
)

router.put(
    '/:petID',
    verifyToken,
    checkRole(['admin', 'owner']),
    petController.updatePet
)

router.delete(
    '/:petID', 
    verifyToken,
    checkRole(['admin', 'owner']),
    petController.deletePet
)

module.exports = router
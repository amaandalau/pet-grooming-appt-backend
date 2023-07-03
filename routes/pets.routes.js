const express = require('express')
const router = express.Router()
const petController = require("../controllers/pets.controllers.js")

router.get('/', petController.getAllPets)

router.get('/:petID', petController.getPetByID)

router.post('/pets', petController.createPet)

router.put('/:petID', petController.updatePet)

router.delete('/:petID', petController.deletePet)

module.exports = router
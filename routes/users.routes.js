const express = require("express")
const router = express.Router()
const usersController = require("../controllers/users.controllers.js")

router.get('/', usersController.getAllUsers)

router.get('/:userID', usersController.getUserByID)

router.post('/', usersController.createUser)

router.put('/:userID', usersController.updateUser)

router.delete('/:userID', usersController.deleteUser)

module.exports = router
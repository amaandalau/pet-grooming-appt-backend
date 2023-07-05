const express = require("express")
const router = express.Router()
const usersController = require("../controllers/users.controllers.js")
const { verifyToken, checkRole } = require("../middlewares/auth.middleware.js")

router.get('/', usersController.getAllUsers)

router.get('/:userID', usersController.getUserByID)

router.post(
    '/', 
    verifyToken,
    checkRole(['admin']),
    usersController.createUser
)

router.put(
    '/:userID',
    verifyToken,
    checkRole(['admin', 'owner', 'groomer']), 
    usersController.updateUser
)

router.delete(
    '/:userID',
    verifyToken,
    checkRole(['admin', 'owner', 'groomer']),
    usersController.deleteUser
)

module.exports = router
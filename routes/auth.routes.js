const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controllers.js')

router.post('/register', authController.register)

router.get('/verify', authController.verifyEmail)

router.post('/login', authController.login)

router.post('/forgotPwd', authController.forgotPassword)

router.post('/resetPwd', authController.resetPassword)

router.post('changePwd', authController.changePassword)

module.exports = router
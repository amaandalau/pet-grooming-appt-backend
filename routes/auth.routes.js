const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controllers.js')
const { verifyToken } = require('../middlewares/auth.middleware.js')

router.get("/me", verifyToken, authController.me)

router.post('/register', authController.register)

router.get('/verify', authController.verifyEmail)

router.post('/login', authController.login)

router.post('/forgotPwd', authController.forgotPassword)

router.post('/resetPwd', authController.resetPassword)

router.post('/changePwd', verifyToken, authController.changePassword)

module.exports = router
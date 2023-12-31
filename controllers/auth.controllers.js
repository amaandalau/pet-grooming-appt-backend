const jwt = require("jsonwebtoken")
const User = require("../models/User.js")
const { hashPassword, comparePassword } = require("../utils/bcrypt.utils.js")
// const { mg } = require("../utils/mailgun.utils.js")

async function me (req, res) {
    try {
        res.json(req.user)
    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function register(req, res) {
    try {
        // Check if user with the same email already exists
        const userExists = await User.findOne({
            where: {
                email: req.body.email
            }
        })

        if (userExists) throw "User already exists"

        // Create user using data from request body
        // Request body must contain all required fields defined in User model
        const hashedPassword = hashPassword(req.body.password)
        const user = await User.create({
            ...req.body,
            password: hashedPassword
        })

        // Create verification token with email
        // const token = jwt.sign(
        //     {
        //         email: user.email
        //     },
        //     process.env.SECRET_KEY,
        //     {
        //         expiresIn: "1h"
        //     }
        // )

        // Create email data
        // const data = {
        //     from: "mailgun@" + process.env.MAILGUN_DOMAIN,
        //     to: user.email,
        //     subject: "Verify Your Account",
        //     text: `Your token is ${token}`
        // }

        // // Send email to user with verify link
        // await mg.messages.create(process.env.MAILGUN_DOMAIN, data)

        // // Email Sent Success Message
        res.status(200).json({
            // message: "Email verification link sent",
            user
        })

    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function verifyEmail(req, res) {
    try {
        // Get verification token from request body
        const { verificationToken } = req.body
    
        if(!verificationToken) throw "Invalid verification token"
    
        // Verify and decode token to get user ID
        const decoded = jwt.verify(verificationToken, process.env.SECRET_KEY)
    
        const user = await User.findOne({
            where: {
                email: decoded.email
            }
        })
    
        // Update user to verified
        await User.update(
            {
                isVerified: true
            },
            {
                where: {
                    email: decoded.email
                }
            }
        )
    
        // // Send success message
        // res.send({
        //     message: "Account Verified"
        // })
    
        // // Prepare email data
        // const data = {
        //     from: "mailgun@" + process.env.MAILGUN_DOMAIN,
        //     to: user.email,
        //     subject: "Account Verified",
        //     text: "Your account is now verified"
        // }
    
        // // Send email to user
        // await mg.messages.create(process.env.MAILGUN_DOMAIN, data)
    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function login(req, res) {
    try {
        // Get user input
        const { email, password } = req.body

        // Validate user input
        if(!email || !password) throw "Email and password are required"

        console.log("checkpoint 1")
        const user = await User.findOne({
            where: {
                email: email
            },
            attributes: { include: "password"}
        })

        console.log("checkpoint 2")

        // Check if user exists
        if(!user) {
            throw "User does not exist. Please sign up"
            // Redirect to register route
        }

        // Validate if user's password matched
        console.log(`Check user:`, user)
        console.log(`Check user pwd:`, user.password)
        const matchingPwd = comparePassword(password, user.password)

        if(!matchingPwd) throw "Invalid login credentials"

        console.log("checkpoint 3")

        // Generate JWT
        const token = jwt.sign({
                id: user.id, 
                email: user.email,
                role: user.role
            },
            process.env.SECRET_KEY,
            {
                algorithm: "HS256"
            }
        )

        res.status(200).json({accessToken: token})
    } catch (error) {
        res.status(500).json({error: error})
    }
}

// User forgot password during login
async function forgotPassword(req, res) {
    try {
        // Get user email from request body
        const { email } = req.body

        if(!email) throw "Email is required"

        // Check if user exists 
        const user = await User.findOne({
            where: {
                email: email
            }
        })

        if(!user) throw "User does not exist"

        // Generate reset token
        const token = jwt.sign(
            {id: user.id},
            process.env.SECRET_KEY,
            {
                expiresIn: "1h"
            }
        )

        // Send email to the user with the reset token
        // const data = {
        //     from: "mailgun@" + process.env.MAILGUN_DOMAIN,
        //     to: email,
        //     subject: "Reset Your Password",
        //     text: `Token to reset password: ${token}`
        // }
        
        // // Send email to user
        // await mg.messages.create(process.env.MAILGUN_DOMAIN, data)

        // Send success response
        res.status(200).json({
            message: "Reset Password Success "
        })

    } catch (error) {
        res.status(500).json({error: error})
    }
}

// For user to reset password for forgetting password
async function resetPassword(req, res) {
    try {
        const { newPassword, resetToken } = req.body

        if(!newPassword) throw "New password is required"

        if(!resetToken) throw "Reset token is required"

        const decoded = jwt.verify(resetToken, process.env.SECRET_KEY)

        const hashedPassword = hashPassword(newPassword)

        // Update user password in database
        await User.update(
            { 
                password: hashedPassword
            },
            {
                where: {
                    id: decoded.id
                }
            }
        )

        // Send success response
        res.send("Password updated")
    } catch (error) {
        res.status(500).json({error: error})
    }
}

// User wants to update their own password on their own terms
async function changePassword(req, res) {
    try {
    
        const { currentPassword, newPassword } = req.body

        if(!currentPassword) throw "Current password is required"
        if(!newPassword) throw "New password is required"

        console.log("checkpoint 1")

        const user = await User.findOne({
            where: {
                email: req.user.email
            },
            attributes: {
                include: 'password'
            }
        })

        if(!user) throw "User not found"

        // Check if current password matches 
        const matchingPwd = comparePassword(currentPassword, user.password)
        if(!matchingPwd) throw "Current password is incorrect"

        console.log("checkpoint 4")        
        const hashedPassword = hashPassword(newPassword)

        // Update user password
        await User.update(
            { password: hashedPassword },
            {
                where: {
                    id: user.id
                }
            }
        )

        // Send success response
        res.send("Password updated")
    } catch (error) {
        res.status(500).json({error: error})
    }
}

module.exports = {
    me,
    register,
    verifyEmail,
    login,
    forgotPassword,
    resetPassword,
    changePassword
}

const User = require("../models/User.js")
const { hashPassword } = require("../utils/bcrypt.utils.js")

async function getAllUsers(req, res) {
    try {
        // Find all users
        const users = await User.findAll()

        // Send all users as response
        res.json(users)
    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function getUserByID(req, res) {
    try {
        // Find user by ID
        const user = await User.findByPk(parseInt(req.params.userID))

        // Send user as response
        res.json(user)
    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function createUser(req, res) {
    try {
        if (req.user.role !== "admin") {
            throw "Unauthorized"
        } 

        const hashedPassword = hashPassword(req.body.password)
        
        const user = await User.create({
            ...req.body,
            password: hashedPassword
        })

        res.json(user)
    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function updateUser(req, res) {
    // User can only update their own profile
    try {
        const user = await User.findByPk(parseInt(req.params.userID))

        if(req.user.role !== 'admin' && user.id !== req.user.id) {
            console.log('User role', req.user.role)
            throw "You can only update your own profile"
        } else {
            const hashedPassword = hashPassword(req.body.password)
            const updatedUser = await User.update(
                {
                    ...req.body,
                    password: hashedPassword
                },
                {
                    where: {
                        id: parseInt(req.params.userID)
                    }
                }
            )

            // Send updated user as response
            res.json(updatedUser)
        }
    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function deleteUser(req, res) {
    try {
        const user = await User.findByPk(parseInt(req.params.userID))
        
        if(req.user.role !== 'admin' && user.id !== req.user.id) {
            throw "You can only delete your own profile"
        } else  {
            const user = await User.destroy({
                where: {
                    id: parseInt(req.params.userID)
                }
            })

            // Send deleted user as response
            res.json(user)
        }

    } catch (error) {
        res.status(500).json({error: error})
    }
}

module.exports = {
    getAllUsers,
    getUserByID,
    createUser,
    updateUser,
    deleteUser
}
const jwt = require("jsonwebtoken")

function verifyToken(req, res, next) {
    // Get auth header value
    const token = req.headers["authorization"]

    try {
        // Check if token is undefined
        if (!token) throw "No token provided"

        // Verify and decode token
        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        // Set user in the request object
        req.user = decoded

    } catch (error) {
        return res.status(500).json({error: error})
    }

    // If all OK, proceed to next middleware (if any)
    return next()
}

function checkRole(roles) {

    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return res.status(401).json({error: "Unauthorized"})
        }

        return next()
    }
}

module.exports = {
    verifyToken,
    checkRole
}
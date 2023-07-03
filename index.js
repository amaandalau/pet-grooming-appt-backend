const express = require("express")
const app = express()
const morgan = require("morgan")

// Load environment variables. See .env file for available variables
// This should be done before loading variables from process.env
require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
})

/*
Morgan configuration that logs the following:
- the request body
- the request params
- the request query
= the time of the request
- the user agent
*/

const morganConfig = morgan(function (tokens, req, res) {
    return [
        JSON.stringify(req.body),
        JSON.stringify(req.params),
        JSON.stringify(req.query),
        tokens.date(req, res, "iso"),
        req.headers["user-agent"],
    ].join(" ")
})

// Middlewares
app.use(express.json())
app.use(morganConfig)

const sequelize = require("./config/db.config.js")

// Define routes here
const authRoutes = require("./routes/auth.routes.js")
const usersRoutes = require("./routes/users.routes.js")
const petsRoutes = require("./routes/pets.routes.js")
const timeslotsRoutes = require("./routes/timeslots.routes.js")
const servicesRoutes = require("./routes/services.routes.js")
const appointmentsRoutes = require("./routes/appointments.routes.js")
const apptServicesRoutes = require("./routes/appt_services.routes.js")
const reviewsRoutes = require("./routes/reviews.routes.js")

app.use("/auth", authRoutes)
app.use("/users", usersRoutes)
app.use("/pets", petsRoutes)
app.use("/timeslots/", timeslotsRoutes)
app.use("/services", servicesRoutes)
app.use("/appointments", appointmentsRoutes)
app.use("/appt-services", apptServicesRoutes)
app.use("/reviews", reviewsRoutes)

// Health
app.get("/", (req, res) => {
    res.send("OK: " + process.env.NODE_ENV)
})

// Start the server
const port = process.env.PORT || 8080
app.listen(port, async () => {
    try {
        await sequelize.authenticate()
        
        console.log("Connection has been established successfully")
        console.log(`🚀 Server running on ${port}`)
        
    } catch (error) {
        console.log("Unable to connect to the database: ", error)
    }
})
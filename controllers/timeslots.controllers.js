const Timeslot = require("../models/Timeslot.js")

async function getAllTimeslots(req, res) {
    try {
        // Find all timeslots
        const timeslots = await Timeslot.findAll()

        // Send all timeslots as response
        res.json(timeslots)
    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function getTimeslotByID(req, res) {
     try {
        // Find timeslots by ID
        const timeslot = await Timeslot.findByPk(parseInt(req.params.timeslotID))

        // Send timeslot as response
        res.json(timeslot)
     } catch (error) {
        res.status(500).json({error: error})
     }
}

async function createTimeslot(req, res) {
    try {
        // Create timeslot using data from request body
        const timeslot = await Timeslot.create({
            ...req.body
        })

        // Send created timeslot as response
        res.json(timeslot)
    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function updateTimeslot(req, res) {
    // Only groomers can update timeslot
    // Only groomers can update their own timeslot
    try {
        const timeslot = await Timeslot.findByPk(parseInt(req.params.timeslotID))

        if(timeslot.groomerID !== req.user.id) {
            throw "You can only update your own timeslots"
        } else {
            const updatedTimeslot = await Timeslot.update(
                req.body,
                {
                    where: {
                        id: parseInt(req.params.timeslotID)
                    }
                }
            )

            // Send updated timeslot as response
            res.json(updatedTimeslot)
        }
    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function deleteTimeslot(req, res) {
    // groomers can only delete their own timeslots
    try {
        const timeslot = await Timeslot.findByPk(parseInt(req.params.timeslotID))

        if(timeslot.groomerID !== req.user.id) {
            throw "You can only delete your own timeslot"
        } else {
            // Delete timeslot by ID
            const deletedTimeslot = await Timeslot.destroy({
                where: {
                    id: parseInt(req.params.timeslotID)
                }
            })

            // Send deleted timeslot as response
            res.json(deletedTimeslot)
        }
    } catch (error) {
        res.status(500).json({error: error})
    }
}

module.exports = {
    getAllTimeslots,
    getTimeslotByID,
    createTimeslot,
    updateTimeslot,
    deleteTimeslot
}
const Appointment = require("../models/Appointment.js")

async function getAllAppointments(req, res) {
    try {
        // Find all appointments 
        const appointments = await Appointment.findAll()

        // Send all appointments as response
        res.json(appointments)
    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function getApptByID(req, res) {
    try {
        // Find appointment by ID
        const appointment = await Appointment.findByPk(parseInt(req.params.apptID))

        // Send appointment as response
        res.json(appointment)
    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function createAppt(req, res) {
    try {

        const appt = await Appointment.create({
            ...req.body
        })

        // Send created appointment as user
        res.json(appt)
    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function updateAppt(req, res) {
    // Check if user is owner or groomer
    // If user is groomer - can only update to confirmed / in-progress / completed
    // If user is owner - can only update to cancel

    try {
        const appt = await Appointment.findByPk(parseInt(req.params.apptID))

        // Groomer and owner can update appointment
        if (req.user.role !== 'admin' && appt.ownerID !== req.user.id && appt.groomerID !== req.user.id) throw "Unauthorized"

        if (req.user.role === 'groomer') {

            if (req.body.status !== 'confirmed' && req.body.status !== 'in-progress' && req.body.status !== 'completed') {
                throw 'Invalid status update'
            }
        }
        
        if (req.user.role === 'owner') {
            
            if(req.body.status !== 'cancelled') {
                console.log('Invalid status update')
                throw "Invalid status update"
            }
        }

            const updatedAppt = await Appointment.update(
                req.body,
                {
                    where: {
                        id: parseInt(req.params.apptID)
                    }
                }
            )

            // Send updated appointment as response
            res.json(updatedAppt)
        
    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function deleteAppt(req, res) {
    // Only owner can delete appointments
    try {
        const appt = await Appointment.findByPk(parseInt(req.params.apptID))

        if(req.user.role !== 'admin' && appt.ownerID !== req.user.id) {
            throw "Not your appointment - cannot delete"
        } else {
            // Delete appointment by iD
            const deletedAppt = await Appointment.destroy({
                where: {
                    id: parseInt(req.params.apptID)
                }
            })

            // Send deleted appointment as response
            res.json(deletedAppt)
        }
    } catch (error) {
        res.status(500).json({error: error})
    }
}

module.exports = {
    getAllAppointments,
    getApptByID,
    createAppt,
    updateAppt,
    deleteAppt
}

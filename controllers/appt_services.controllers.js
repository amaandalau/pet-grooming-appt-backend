const AppointmentServices = require("../models/AppointmentService.js")

async function getAllApptServices(req, res) {
    try {
        // Find all appointment services 
        const apptServices = await AppointmentServices.findAll()

        // Send all appointment services as response
        res.json(apptServices)
    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function getApptServiceByID(req, res) {
    try {
        // Find appointment services by ID
        const apptService = await AppointmentServices.findByPk(parseInt(req.params.apptServiceID))

        // Send appointment service by ID
        res.json(apptService)
    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function createApptService(req, res) {
    // Only groomer can create services
    try {
        if (req.user.role !== "groomer") throw "Unauthorized"

        const apptService = await AppointmentServices.create({
            ...req.body
        })

        // Send created service as response
        res.json(apptService)

    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function updateApptService(req, res) {
    // Only groomer can update services
    try {
        if (req.user.role !== "groomer") throw "Unauthorized"

        const updatedApptService = await AppointmentServices.update(
            req.body,
            {
                where: {
                    id: parseInt(req.params.apptServiceID)
                }
            }
        )

        // Send updated appointment service
        res.json(updatedApptService)

    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function deleteApptService(req, res) {
    // Only groomer can delete services
    try {
        // const apptService = await AppointmentServices(parseInt(req.params.apptServiceID))

        const deletedApptService = await AppointmentServices.destroy({
            where: {
                id: parseInt(req.params.apptServiceID)
            }
        })

        // Send deleted appointment service as response
        res.json(deletedApptService)

    } catch (error) {
        res.status(500).json({error: error})
    }
}

module.exports = {
    getAllApptServices,
    getApptServiceByID,
    createApptService,
    updateApptService,
    deleteApptService
}
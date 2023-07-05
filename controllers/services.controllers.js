const Service = require("../models/Service.js")

async function getAllServices(req, res) {
    try {
        // Find all services
        const services = await Service.findAll()

        // Send all services as response
        res.json(services)
    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function getServicesByID(req, res) {
    try {
        // Find service by ID
        const service = await Service.findByPk(parseInt(req.params.serviceID))

        // Send service as response
        res.json(service)
    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function createService(req, res) {
    // Only groomers can create services
    try {
        if (req.user.role == "owner" ) throw "Unauthorized"

        const service = await Service.create({
            ...req.body
        })

        // Send created service as response
        res.json(service)
    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function updateService(req, res) {
    // Only groomer can update services
    // Only groomers can update their OWN services
    try {

        const service = await Service.findByPk(parseInt(req.params.serviceID))

        if (req.user.role !== 'admin' && service.groomerID !== req.user.id) {
            throw "Cannot update services that aren't yours =.="
        } else {
            const updatedService = await Service.update(
                {
                    ...req.body
                },
                {
                    where: {
                        id: parseInt(req.params.serviceID)
                    }
                }
            )

            // Send updated service as response
            res.json(updatedService)
        }
    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function deleteService(req, res) {
    // Only groomers can delete their own services
    try {
        const service = await Service.findByPk(parseInt(req.params.serviceID))

        if (req.user.role !== 'admin' && service.groomerID !== req.user.id) throw "Can't delete other ppl's services"

        // Delete service by ID
        const deletedService = await Service.destroy({
            where: {
                id: parseInt(req.params.serviceID)
            }
        })

        // Send deleted service as response
        res.json(deletedService)
        
    } catch (error) {
        res.status(500).json({error: error})
    }
}

module.exports = {
    getAllServices,
    getServicesByID,
    createService,
    updateService,
    deleteService
}
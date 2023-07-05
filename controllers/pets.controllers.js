const Pet = require("../models/Pet.js")

async function getAllPets(req, res) {
    try {
        // Find all pets
        const pets = await Pet.findAll()

        // Send all pets as response
        res.json(pets)

    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function getAllPetsByOwnerID(req, res) {
    try {
        const pets = await Pet.findAll({
            where: {
                ownerID: req.params.userID
            }
        })

        res.json(pets)
    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function getPetByID(req, res) {
    try {
        // Find pet by ID
        const pet = await Pet.findByPk(parseInt(req.params.petID))

        // Send pet as response
        res.json(pet)

    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function createPet(req, res) {
    try {

        const pet = await Pet.create({
            ...req.body,
        })

        // Send created pet as response 
        res.json(pet)

    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function updatePet(req, res) {
    // Only pet owners can update their own pet profiles
    try {
        // Check if is pet owner
        const pet = await Pet.findByPk(parseInt(req.params.petID))

        if(req.user.role !== 'admin' && pet.ownerID !== req.user.id) {
            throw "Not your pet, cannot update"
        } else {
            const updatedPet = await Pet.update(
                req.body,
                {
                    where: {
                        id: parseInt(req.params.petID)
                    }
                })

                // Send updated pet as response
                res.json(updatedPet)
        }

    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function deletePet(req, res) {
    // Only owners can delete their own pet
    try {
        const pet = await Pet.findByPk(parseInt(req.params.petID))

        if(req.user.role !== 'admin' && pet.ownerID !== req.user.id) {
            throw "Not your pet - cannot delete"
        } else {
            const deletedPet = await Pet.destroy({
                where: {
                    id: parseInt(req.params.petID)
                }
            })

            // Send deleted pet as response
            res.json(deletedPet)
        }
    } catch (error) {
        res.status(500).json({error: error})
    }
}

module.exports = {
    getAllPets,
    getPetByID,
    getAllPetsByOwnerID,
    createPet,
    updatePet,
    deletePet
}
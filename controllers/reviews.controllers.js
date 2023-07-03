const Review = require("../models/Review.js")

async function getAllReviews(req, res) {
    try {
        // Find all reviews
        const reviews = await Review.findAll()

        // Send all reviews as response
        res.json(reviews)
    } catch (error) {
        res.status(500).json({error: error})
    }

}

async function getReviewByID(req, res) {
    try {
        // Find review by ID
        const review = await Review.findByPk(parseInt(req.params.reviewID))

        // Send review as response
        res.json(review)
    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function createReview(req, res) {
    // Only owners can create review
    try {
        if (req.user.role !== "owner") throw "Unauthorized"

        const review = await Review.create({
            ...req.body
        })

        // Send created review as response
        res.json(review)
    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function updateReview(req, res) {
    // Only owners can update their own review
    try {
        const review = await Review.findByPk(parseInt(req.params.reviewID))

        if (review.ownerID !== req.user.id) throw "Cannot update other people's reviews"

        const updatedReview = await Review.update(
            {
                ...req.body
            }, 
            {
                where: {
                    id: parseInt(req.params.reviewID)
                }
            }
        )

        // Send updated review as response
        res.json(updateReview)
    } catch (error) {
        res.status(500).json({error: error})
    }
}

async function deleteReview(req, res) {
    // Only owners can delete their own reviews
    try {
        const review = await Review.findByPk(parseInt(req.params.reviewID))

        if(review.ownerID !== req.user.id) throw "Cannot delete other people's reviews"

        const deletedReview = await Review.destroy({
            where: {
                id: parseInt(req.params.reviewID)
            }
        })

        // Send deleted review as response
        res.json(deletedReview)
    } catch (error) {
        res.status(500).json({error: error})
    }
}

module.exports = {
    getAllReviews,  
    getReviewByID,
    createReview,
    updateReview,
    deleteReview
}
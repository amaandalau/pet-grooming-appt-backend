const express = require('express')
const router = express.Router()
const reviewsController = require("../controllers/reviews.controllers.js")

router.get('/', reviewsController.getAllReviews)

router.get('/:reviewID', reviewsController.getReviewByID)

router.post('/', reviewsController.createReview)

router.put('/:reviewID', reviewsController.updateReview)

router.delete('/:reviewID', reviewsController.deleteReview)

module.exports = router
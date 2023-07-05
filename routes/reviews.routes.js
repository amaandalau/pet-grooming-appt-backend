const express = require('express')
const router = express.Router()
const reviewsController = require("../controllers/reviews.controllers.js")
const { verifyToken, checkRole } = require('../middlewares/auth.middleware.js')

router.get('/', reviewsController.getAllReviews)

router.get('/users/:userID', reviewsController.getAllReviewsByGroomerID)

router.get('/:reviewID', reviewsController.getReviewByID)

router.post(
    '/',
    verifyToken,
    checkRole(['admin', 'owner']),
    reviewsController.createReview
)

router.put(
    '/:reviewID', 
    verifyToken,
    checkRole(['admin', 'owner']),
    reviewsController.updateReview
)

router.delete(
    '/:reviewID', 
    verifyToken,
    checkRole(['admin', 'owner']),
    reviewsController.deleteReview
)

module.exports = router
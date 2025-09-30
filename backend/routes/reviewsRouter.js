import { Router } from "express";

import { getAllReviews, getAllReviewsWithLimit, getReviewsByUser, getReviewsByUserWithLimit, postReview, deleteReview } from "../controllers/reviewsController.js";

const router = Router()

router.get('/all/', getAllReviews)
router.get('/all/:limit', getAllReviewsWithLimit)
router.get('/:accountid', getReviewsByUser)
router.get('/:accountid/:limit', getReviewsByUserWithLimit)
router.post('/post', postReview)
router.delete('/delete/:id', deleteReview)

export default router
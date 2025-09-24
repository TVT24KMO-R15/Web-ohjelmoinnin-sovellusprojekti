import { Router } from "express";

import { getAllReviews, getReviewsByUser, postReview, deleteReview } from "../controllers/reviewsController.js";

const router = Router()

router.get('/', getAllReviews)
router.get('/:accountid', getReviewsByUser)
router.post('/post', postReview)
router.delete('/delete/:id', deleteReview)

export default router
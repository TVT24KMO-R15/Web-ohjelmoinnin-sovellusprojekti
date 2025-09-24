import { Router } from "express";

import { getAllReviews, getReviewsByUser, postReview } from "../controllers/reviewsController.js";

const router = Router()

router.get('/', getAllReviews)
router.get('/:accountid', getReviewsByUser)
router.post('/post', postReview)

export default router
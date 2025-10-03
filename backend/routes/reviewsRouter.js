import { Router } from "express";

import { getAllReviews, getAllReviewsWithLimit, getReviewsByUser, getReviewsByUserWithLimit, getReviewsByMovieIdWithLimitOffset, getReviewsByMovieUser, postReview, putReview, deleteReview, getPageAmount, getAllReviewsPages } from "../controllers/reviewsController.js";

const router = Router()

router.get('/all/', getAllReviews)
router.get('/all/:limit', getAllReviewsWithLimit)
router.get('/pageamount', getPageAmount)
router.get('/frompage/:page', getAllReviewsPages)
router.get('/:accountid', getReviewsByUser)
router.get('/:accountid/:limit', getReviewsByUserWithLimit)
router.get('/movie/:movieid/:limit/:offset', getReviewsByMovieIdWithLimitOffset)
router.get('/movieuser/:movieid/:accountid', getReviewsByMovieUser)
router.post('/post', postReview)
router.put(`/put`, putReview)
router.delete('/delete/:id', deleteReview)

export default router
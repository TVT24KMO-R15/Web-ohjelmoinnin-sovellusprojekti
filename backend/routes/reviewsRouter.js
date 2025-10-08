import { Router } from "express";
import { auth } from "../helpers/authHelper.js";

import { getAllReviews, getAllReviewsWithLimit, getReviewsByUser, getReviewsByUserWithLimit, getReviewsByMovieIdWithLimitOffset, getReviewsByMovieUser, postReview, putReview, deleteReview, getPageAmount, getAllReviewsPages, getFilteredReviewsPages, getFilteredPageAmount } from "../controllers/reviewsController.js";

const router = Router()

router.get('/all/', getAllReviews)
router.get('/all/:limit', getAllReviewsWithLimit)
router.get('/pageamount', getPageAmount)
router.get('/filtered/pageamount', getFilteredPageAmount)
router.get('/frompage/:page', getAllReviewsPages)
router.get('/filtered/frompage/:page', getFilteredReviewsPages)
router.get('/:accountid', auth, getReviewsByUser)
router.get('/:accountid/:limit', auth, getReviewsByUserWithLimit)
router.get('/movie/:movieid/:limit/:offset', getReviewsByMovieIdWithLimitOffset)
router.get('/movieuser/:movieid/:accountid', auth, getReviewsByMovieUser)
router.post('/post', auth, postReview)
router.put(`/put`, auth, putReview)
router.delete('/delete/:id', auth, deleteReview)

export default router
// for all review table http endpoints
import { queryAllReviews, queryReviewsByUserId, queryPostReview, queryDeleteReview } from "../models/reviews.js";

const getAllReviews = async (req, res, next) => {
    try {
        const result = await queryAllReviews()
        console.log("get all reviews")
        return res.status(200).json(result.rows)
    } catch (error) {
        return next (error) // send error to middleware in index.js
    }
}

const getReviewsByUser = async (req, res, next) => {
    try {
        //const userid = (req.params.accountid)
        const result =  await queryReviewsByUserId(req.params.accountid)
        console.log("get reviews for user: "+ req.params.accountid)
        return res.status(200).json(result)
    } catch (error) {
        return next (error)
    }

}

const postReview = async (req, res, next) => {
    const { review } = req.body
    try {
        if (!review.movieid || !review.accountid || !review.reviewtext || !review.stars) {
            const error = new Error('Email and password are required')
            error.status = 400
            return next(error)
        }

        const result = await queryPostReview(review.movieid, review.stars, review.accountid, review.reviewtext)
        return res.status(201).json(result)
    } catch (error) {
        return next(error)
    }
}

const deleteReview = async (req, res, next) => {
    const { id } = req.params

    try {
        console.log(`Deleting review with id: ${id}`)
        const result = await queryDeleteReview(id)
        if (result.rowCount === 0) {
            const error = new Error('Review not found')
            error.status = 400
            return next(error)
        }
        return res.status(200).json({ id: id })
    } catch (error) {
        return next(error)
    }
}

export { getAllReviews, getReviewsByUser, postReview, deleteReview }
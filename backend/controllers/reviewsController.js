// for all review table http endpoints
import { queryAllReviews, queryAllReviewsWithLimit, queryReviewsByUserId, queryReviewsByUserWithLimit, queryReviewsByMovieIdWithLimitOffset, queryReviewsByMovieUser, queryPostReview, queryUpdateReview, queryDeleteReview, queryReviewsPageAmount, queryAllReviewsPages, queryFilteredReviewsPages, queryFilteredReviewsPageAmount } from "../models/reviews.js";

const getAllReviews = async (req, res, next) => {
    try {
        const result = await queryAllReviews()
        console.log("get all reviews")
        return res.status(200).json(result.rows)
    } catch (error) {
        return next (error) // send error to middleware in index.js
    }
}

const getAllReviewsWithLimit = async (req, res, next) => {
    try {
        
        const result =  await queryAllReviewsWithLimit(req.params.limit)
        console.log("get all reviews with limit "+ req.params.limit)
        return res.status(200).json(result.rows)
    } catch (error) {
        return next (error)
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

const getReviewsByUserWithLimit = async (req, res, next) => {
    try {
        //const userid = (req.params.accountid)
        const result =  await queryReviewsByUserWithLimit(req.params.accountid, req.params.limit)
        console.log("get reviews for user: "+ req.params.accountid + ", with limit: " + req.params.limit)
        return res.status(200).json(result)
    } catch (error) {
        return next (error)
    }

}

const getReviewsByMovieIdWithLimitOffset = async (req, res, next) => {
    try {
    const result = await queryReviewsByMovieIdWithLimitOffset(req.params.movieid, req.params.limit, req.params.offset)
    console.log("get reviews for movie: "+ req.params.movieid + ", with limit: " + req.params.limit + ", page: " + req.params.offset)
    return res.status(200).json(result.rows)
    } catch (error) {
        return next (error)
    }
}

const getReviewsByMovieUser = async (req, res, next) => {
    try {
        const result = await queryReviewsByMovieUser(req.params.movieid, req.params.accountid)
        console.log("get reviews for movie: "+ req.params.movieid + " by user: " + req.params.accountid)
        return res.status(200).json(result.rows)
    } catch (error) {
        return next (error)
    }
}

const postReview = async (req, res, next) => {
    const { review } = req.body
    try {
        if (!review.movieid || !review.accountid || !review.stars) {
            const error = new Error('Missing review data')
            error.status = 400
            return next(error)
        }

        const result = await queryPostReview(review.movieid, review.stars, review.accountid, review.reviewtext)
        return res.status(201).json(result)
    } catch (error) {
        return next(error)
    }
}

const putReview = async (req, res, next) => {
    const { review } = req.body
    try {
        if (!review.movieid || !review.accountid || !review.stars) {
            const error = new Error('Missing review data')
            error.status = 400
            return next(error)
        }

        const result = await queryUpdateReview(review.movieid, review.stars, review.accountid, review.reviewtext)
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

const getPageAmount = async (req, res, next) => {
    // console.log("getting page amount")
    try {
        const result = await queryReviewsPageAmount()
        return res.status(200).json(result.rows[0])
    } catch (error) {
        return next (error)
    }
}

const getAllReviewsPages = async (req, res, next) => {
    console.log("getting all reviews page: " + req.params.page)
    try {
        const result = await queryAllReviewsPages(req.params.page)
        return res.status(200).json(result.rows)
    } catch (error) {
        return next (error)
    }
}

const getFilteredReviewsPages = async (req, res, next) => {
    const { page } = req.params
    const { stars, orderby } = req.query
    console.log(`CONTROLLER: getting filtered reviews - page: ${page}, stars: ${stars || 'all'}, orderby: ${orderby || 'date'}`)
    try {
        const result = await queryFilteredReviewsPages(page, stars, orderby)
        return res.status(200).json(result.rows)
    } catch (error) {
        return next(error)
    }
}

const getFilteredPageAmount = async (req, res, next) => {
    const { stars } = req.query
    console.log(`CONTROLLER: getting filtered page amount - stars: ${stars || 'all'}`)
    try {
        const result = await queryFilteredReviewsPageAmount(stars)
        return res.status(200).json(result.rows[0])
    } catch (error) {
        return next(error)
    }
}


export { getAllReviews, getAllReviewsWithLimit, getReviewsByUser, getReviewsByUserWithLimit, getReviewsByMovieIdWithLimitOffset, getReviewsByMovieUser, postReview, putReview, deleteReview, getAllReviewsPages, getPageAmount, getFilteredReviewsPages, getFilteredPageAmount }
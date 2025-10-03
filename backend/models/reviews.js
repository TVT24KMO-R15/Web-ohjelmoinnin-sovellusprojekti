// for all review table sql queries

import { pool } from "../helpers/dbHelper.js"

const queryAllReviews = async () => {
    return await pool.query(`SELECT * FROM review ORDER BY reviewdate DESC`)
}

const queryAllReviewsWithLimit = async ( limit ) => {
    return await pool.query(`SELECT * FROM review ORDER BY reviewdate DESC LIMIT $1`, [limit])
}

const queryReviewsByUserId = async ( userid ) => {
    return await pool.query(`SELECT * FROM review WHERE fk_accountid = $1 ORDER BY reviewdate DESC`, [userid])
}

const queryReviewsByUserWithLimit = async ( userid, limit ) => {
    return await pool.query(`SELECT * FROM review WHERE fk_accountid = $1 ORDER BY reviewdate DESC LIMIT $2 `, [userid, limit])
}

const queryReviewsByMovieIdWithLimitOffset = async (movieid, limit, offset) => {
    return await pool.query(`SELECT * FROM review WHERE movieid = $1 ORDER BY reviewdate DESC LIMIT $2 OFFSET $3`, [movieid, limit, offset])
}

const queryReviewsByMovieUser = async (movieid, userid) => {
    return await pool.query(`SELECT * FROM review WHERE movieid = $1 AND fk_accountid = $2`, [movieid, userid])
}

const queryPostReview = async (movieid, stars, accountid, reviewtext) => {
    return await pool.query(`INSERT INTO review (movieid, stars, fk_accountid, reviewtext) VALUES ($1, $2, $3, $4) RETURNING *`,
        [movieid, stars, accountid, reviewtext]
    )
}

const queryUpdateReview = async (movieid, stars, accountid, reviewtext) => {
    return await pool.query(`UPDATE review SET stars = $2, reviewtext = $4, reviewdate = CURRENT_TIMESTAMP(0) WHERE movieid = $1 AND fk_accountid = $3 RETURNING *`,
        [movieid, stars, accountid, reviewtext]
    )
}

const queryDeleteReview = async (reviewid) => {
    return await pool.query(`DELETE FROM review WHERE reviewid = $1`, [reviewid])
}

const queryReviewsPageAmount = async () => {
    return await pool.query(`SELECT CEIL(COUNT(*) / 5.0) AS pageamount FROM review`)
}

const queryAllReviewsPages = async ( page ) => {
    const limit = 5
    const offset = (page - 1) * limit
    console.log("limit: " + limit + ", offset: " + offset)
    return await pool.query(`SELECT * FROM review ORDER BY reviewdate DESC LIMIT $1 OFFSET $2`, [limit, offset])
}

export { queryAllReviews, queryAllReviewsWithLimit, queryReviewsByUserId, queryReviewsByUserWithLimit, queryReviewsByMovieIdWithLimitOffset, queryReviewsByMovieUser, queryPostReview, queryUpdateReview , queryDeleteReview, queryReviewsPageAmount, queryAllReviewsPages }
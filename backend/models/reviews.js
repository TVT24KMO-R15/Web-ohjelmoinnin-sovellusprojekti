// for all review table sql queries

import { pool } from "../helpers/dbHelper.js"

const maxResultsPerPage = 10

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
    return await pool.query(`SELECT CEIL(COUNT(*) / ${maxResultsPerPage}.0) AS pageamount FROM review`)
}

const queryAllReviewsPages = async ( page ) => {
    const offset = (page - 1) * maxResultsPerPage
    console.log("limit: " + maxResultsPerPage + ", offset: " + offset)
    return await pool.query(`SELECT * FROM review ORDER BY reviewdate DESC LIMIT $1 OFFSET $2`, [maxResultsPerPage, offset])
}

const queryFilteredReviewsPages = async (page, stars, orderby) => {
    const offset = (page - 1) * maxResultsPerPage
    let query = `SELECT * FROM review` // base query
    const params = [] // create params array for building a query
        if (stars) { // if using star filter
        query += ` WHERE stars = $1` // set 
        params.push(stars) // push
    }
    if (orderby === 'stars') { // if ordering by stars
        query += ` ORDER BY stars DESC, reviewdate DESC` // add query
    } else {
        query += ` ORDER BY reviewdate DESC` // default ordering
    }
    query += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}` // limit results and page offset
    params.push(maxResultsPerPage, offset) // push
    // console.log("query: " + query + ", params: " + params)
    return await pool.query(query, params)
}

const queryFilteredReviewsPageAmount = async (stars) => {
    let query = `SELECT CEIL(COUNT(*) / ${maxResultsPerPage}.0) AS pageamount FROM review`
    const params = []
    if (stars) { // if using star filter
        query += ` WHERE stars = $1` // add to query
        params.push(stars) // push
    }
    // console.log("query: " + query + ", placeholder values: " + params)
    return await pool.query(query, params)
}

export { queryAllReviews, queryAllReviewsWithLimit, queryReviewsByUserId, queryReviewsByUserWithLimit, queryReviewsByMovieIdWithLimitOffset, queryReviewsByMovieUser, queryPostReview, queryUpdateReview , queryDeleteReview, queryReviewsPageAmount, queryAllReviewsPages, queryFilteredReviewsPages, queryFilteredReviewsPageAmount }
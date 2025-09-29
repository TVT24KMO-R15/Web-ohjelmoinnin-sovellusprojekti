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

const queryPostReview = async (movieid, stars, accountid, reviewtext) => {
    return await pool.query(`INSERT INTO review (movieid, stars, fk_accountid, reviewtext) VALUES ($1, $2, $3, $4) RETURNING *`,
        [movieid, stars, accountid, reviewtext]
    )
}

const queryDeleteReview = async (reviewid) => {
    return await pool.query(`DELETE FROM review WHERE reviewid = $1`, [reviewid])
}

export { queryAllReviews, queryAllReviewsWithLimit, queryReviewsByUserId, queryReviewsByUserWithLimit, queryPostReview , queryDeleteReview }
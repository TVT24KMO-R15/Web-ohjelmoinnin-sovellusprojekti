// for all review table sql queries

import { pool } from "../helpers/dbHelper.js"

const queryAllReviews = async () => {
    return await pool.query(`SELECT * FROM review ORDER BY reviewdate DESC`)
}

const queryReviewsByUserId = async ( userid ) => {
    return await pool.query(`SELECT * FROM review WHERE fk_accountid = $1`, [userid])
}

const queryPostReview = async (movieid, stars, accountid, reviewtext) => {
    return await pool.query(`INSERT INTO review (movieid, stars, fk_accountid, reviewtext) VALUES ($1, $2, $3, $4) RETURNING *`,
        [movieid, stars, accountid, reviewtext]
    )
}



export { queryAllReviews, queryReviewsByUserId, queryPostReview }
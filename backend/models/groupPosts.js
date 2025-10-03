// for all group posts sql queries// for all group table sql queries

import { pool } from "../helpers/dbHelper.js"

// TODO: Add Finnkino times to DB or provide parameters for Finnkino API to save FinnkinoTimes
const queryPostGroupPost = async (postid, groupid, posttext, movieid, accountid) => {
    return await pool.query(`INSERT INTO "groupposts" (postid, fk_groupid, posttext, movieid, fk_accountid) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [postid, groupid, posttext, movieid, accountid]
    )
}

const queryAllGroupPosts = async () => {
    return await pool.query(`SELECT * FROM "groupposts" ORDER BY postdate DESC`)
}

const queryGroupPostsByGroupId = async (groupId) => {
    return await pool.query(`SELECT * FROM "groupposts" WHERE fk_groupid = $1`, [groupId])
}
const queryGroupPostsByPostId = async (postId) => {
    return await pool.query(`SELECT * FROM "groupposts" WHERE postid = $1`, [postId])
}


const queryUpdateGroupPost = async (postid, groupid, posttext, movieid, accountid)=> {
    return await pool.query(`UPDATE "groupposts"
SET postid = $1, fk_groupid = $2, posttext = $3, movieid = $4
WHERE postid = $1 and fk_accountid = $5 RETURNING *`, [postid, groupid, posttext, movieid, accountid]
    )
}

const queryDeleteGroupPost = async (postid, accountid) => {
    return await pool.query(`DELETE FROM "groupposts" WHERE postid=$1 and fk_accountid = $2 RETURNING *`, [postid, accountid])
}

export { queryPostGroupPost, 
    queryAllGroupPosts, 
    queryGroupPostsByGroupId, 
    queryGroupPostsByPostId, 
    queryUpdateGroupPost, 
    queryDeleteGroupPost }
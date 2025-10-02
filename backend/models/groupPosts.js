// for all group posts sql queries// for all group table sql queries

import { pool } from "../helpers/dbHelper.js"



const queryPostGroupPost = async (postid, groupid, posttext, movieid) => {
    return await pool.query(`INSERT INTO "groupposts" (postid, fk_groupid, posttext, movieid) VALUES ($1, $2, $3, $4) RETURNING *`,
        [postid, groupid, posttext, movieid]
        /* , finnkinoShowtime */
    )
}

const queryAllGroupPosts = async () => {
    return await pool.query(`SELECT * FROM "groupposts" ORDER BY postdate DESC`)
}

const queryGroupPostsByGroupId = async (groupId) => {
    return await pool.query(`SELECT * FROM "groupposts" WHERE fk_groupid = $1`, [groupId])
}

const queryUpdateGroupPost = async (postid, groupid, posttext, movieid)=> {
    return await pool.query(`UPDATE "groupsposts"
SET postid = $1, groupid = $2, posttext = $2, movieid = $2
WHERE postid = $2 RETURNING *`, [postid, groupid, posttext, movieid]
    )
}

const queryDeleteGroupPost = async (postid) => {
    return await pool.query(`DELETE FROM groupposts WHERE postid=$1 RETURNING *`, [postid])
}

export { queryPostGroupPost, queryAllGroupPosts, queryGroupPostsByGroupId, queryUpdateGroupPost, queryDeleteGroupPost }
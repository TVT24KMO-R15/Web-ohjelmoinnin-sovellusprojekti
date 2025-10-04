// for all group posts sql queries

import { pool } from "../helpers/dbHelper.js"

const queryPostGroupPost = async (groupid, posttext, movieid, accountid) => {
    return await pool.query(`INSERT INTO "groupposts" (fk_groupid, posttext, movieid, fk_accountid) VALUES ($1, $2, $3, $4) RETURNING *`,
        [groupid, posttext, movieid, accountid]
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

const queryUpdateGroupPost = async (postid, posttext, movieid, accountid)=> {
    return await pool.query(`UPDATE "groupposts"
SET posttext = $2, movieid = $3
WHERE postid = $1 and fk_accountid = $4 RETURNING *`, [postid, posttext, movieid, accountid]
    )
}

const queryDeleteGroupPost = async (postid, accountid) => {
    return await pool.query(`DELETE FROM "groupposts" WHERE postid=$1 and fk_accountid = $2 RETURNING *`, [postid, accountid])
}

const queryDeleteGroupPostAsOwner = async (postid) => {
    return await pool.query(`DELETE FROM "groupposts" WHERE postid=$1 RETURNING *`, [postid])
}

export { queryPostGroupPost, 
    queryAllGroupPosts, 
    queryGroupPostsByGroupId, 
    queryGroupPostsByPostId, 
    queryUpdateGroupPost, 
    queryDeleteGroupPost,
    queryDeleteGroupPostAsOwner }
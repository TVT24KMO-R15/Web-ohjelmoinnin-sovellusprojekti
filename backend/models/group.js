// for all group table sql queries

import { pool } from "../helpers/dbHelper.js"

const queryPostGroup = async (ownerid, groupname, groupdescription) => {
    return await pool.query(`INSERT INTO "groups" (fk_ownerid, groupname, groupdescription) VALUES ($1, $2, $3) RETURNING *`,
        [ownerid, groupname, groupdescription]
    )
}

const queryAllGroups = async () => {
    return await pool.query(`SELECT * FROM "groups" ORDER BY groupname DESC`)
}

const queryGroupById = async (id) => {
    return await pool.query(`SELECT * FROM "groups" WHERE groupid = $1`, [id])
}

const queryGroupBySearchWord = async (word) => {
    return await pool.query(`SELECT * FROM groups WHERE groupname ILIKE $1`, ['%' + word + '%'])
}

const queryGroupByOwnerId = async (ownerid) => {
    return await pool.query(`SELECT * FROM groups WHERE fk_ownerid = $1`, [ownerid])
}

const queryIsOwnerOfGroup = async (groupid, ownerid) => {
    return await pool.query(`SELECT * FROM groups WHERE groupid = $1 AND fk_ownerid = $2`, [groupid, ownerid])
}

const queryUpdateGroup = async (groupid, ownerid, groupname, groupdescription)=> {
    return await pool.query(`UPDATE "groups"
SET fk_ownerid = $2, groupname = $3, groupdescription = $4
WHERE groupid = $1 RETURNING *`, [groupid, ownerid, groupname, groupdescription]
    )
}

const queryDeleteGroup = async (groupid, ownerid) => {
    return await pool.query(`DELETE FROM groups WHERE groupid=$1 AND fk_ownerid=$2 RETURNING *`, [groupid, ownerid])
}

const queryAllMembersByGroupId = async (groupid) => {
    return await pool.query(`SELECT a.username
    FROM account a
    JOIN user_group_linker ugl ON a.accountid = ugl.fk_accountid
    WHERE ugl.fk_groupid = $1`, [groupid])
}

const queryMembershipStatus = async (groupid, accountid) => {
    console.log("Checking membership status for accountid:", accountid, "in groupid:", groupid);
    return await pool.query(`SELECT 1 AS in_group
    FROM user_group_linker
    WHERE fk_groupid = $1 AND fk_accountid = $2`, [groupid, accountid]
    )
}

export { queryAllGroups, queryGroupById, queryGroupBySearchWord, queryGroupByOwnerId, queryPostGroup, queryDeleteGroup, queryUpdateGroup, queryIsOwnerOfGroup, queryAllMembersByGroupId, queryMembershipStatus }
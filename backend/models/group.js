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

const queryUpdateGroup = async (groupid, ownerid, groupname, groupdescription)=> {
    return await pool.query(`UPDATE "groups"
SET fk_ownerid = $2, groupname = $3, groupdescription = $4
WHERE groupid = $1 RETURNING *`, [groupid, ownerid, groupname, groupdescription]
    )
}

const queryDeleteGroup = async (groupid, ownerid) => {
    return await pool.query(`DELETE FROM groups WHERE groupid=$1 AND fk_ownerid=$2 RETURNING *`, [groupid, ownerid])
}

export { queryAllGroups, queryGroupById, queryPostGroup, queryDeleteGroup, queryUpdateGroup }
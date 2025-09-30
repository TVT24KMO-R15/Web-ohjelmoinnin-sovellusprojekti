// for all group table sql queries

import { pool } from "../helpers/dbHelper.js"

const queryPostGroup = async (fk_ownerid, groupname, groupdescription) => {
    return await pool.query(`INSERT INTO "groups" (fk_ownerid, groupname, groupdescription) VALUES ($1, $2, $3) RETURNING *`,
        [fk_ownerid, groupname, groupdescription]
    )
}

const queryAllGroups = async () => {
    return await pool.query(`SELECT * FROM "groups" ORDER BY groupname DESC`)
}

const queryGroupById = async (id) => {
    return await pool.query(`SELECT * FROM "groups" WHERE groupid = $1`, [id])
}

const queryUpdateGroup = async (groupid, fk_ownerid, groupname, groupdescription)=> {
    return await pool.query(`UPDATE "groups"
SET fk_ownerid = $2, groupname = $3, groupdescription = $4
WHERE groupid = $1`, [groupid, fk_ownerid, groupname, groupdescription]
    )
}

const queryDeleteGroup = async (groupid) => {
    return await pool.query(`DELETE FROM "groups" WHERE groupid = $1`, [groupid])
}

export { queryAllGroups, queryGroupById, queryPostGroup, queryDeleteGroup, queryUpdateGroup }
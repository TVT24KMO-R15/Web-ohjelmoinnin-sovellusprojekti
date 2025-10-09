// for all User and group linker sql queries
import { pool } from "../helpers/dbHelper.js"

const queryAllUserGroupLinker = async () => {
    return await pool.query(`SELECT * FROM "user_group_linker"`)
}

const queryAllUsersByGroupId = async (groupid) => {
    return await pool.query(`
        SELECT ugl.fk_groupid, ugl.fk_accountid, a.username 
        FROM "user_group_linker" ugl
        JOIN "account" a ON ugl.fk_accountid = a.accountid
        WHERE ugl.fk_groupid = $1
    `, [groupid])
}

const queryAllGroupsByAccountId = async (accountid) => {
    return await pool.query(`SELECT * FROM "user_group_linker" where fk_accountid = $1`, [accountid])
}

const queryAllByGroupIdAccountId = async (groupid, accountid) => {
    return await pool.query(`SELECT * FROM "user_group_linker" where fk_accountid = $1 and fk_groupid = $2`, [accountid, groupid])
}

const queryPostUserGroupLinker = async (groupid, accountid) => {
    return await pool.query(`INSERT INTO "user_group_linker" (fk_groupid, fk_accountid) VALUES ($1, $2) RETURNING *`,
        [groupid, accountid]
    )
}

const queryDeleteByAccountId = async (accountid) => {
    return await pool.query(`DELETE FROM "user_group_linker" where fk_accountid = $1 RETURNING *`,[accountid])
}

const queryDeleteByGroupId = async (groupid) => {
    return await pool.query(`DELETE FROM "user_group_linker" where fk_groupid = $1 RETURNING *`,[groupid])
}

const queryDeleteByAccountIdGroupId = async (accountid, groupid) => {
    return await pool.query(`DELETE FROM "user_group_linker" where fk_accountid = $1 and fk_groupid = $2 RETURNING *`,[accountid, groupid])
}

export {
    queryAllUserGroupLinker, 
    queryAllUsersByGroupId, 
    queryAllGroupsByAccountId, 
    queryPostUserGroupLinker, 
    queryDeleteByAccountId, 
    queryDeleteByGroupId, 
    queryDeleteByAccountIdGroupId, 
    queryAllByGroupIdAccountId 
} 
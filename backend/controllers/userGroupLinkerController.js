// for all user usergrouplinker http endpoints
import {
    queryAllUserGroupLinker, 
    queryAllUsersByGroupId, 
    queryAllGroupsByAccountId, 
    queryPostUserGroupLinker, 
    queryDeleteByAccountId, 
    queryDeleteByGroupId, 
    queryDeleteByAccountIdGroupId,
    queryAllByGroupIdAccountId
} from "../models/userGroupLinker.js"

const getAllUserGroupLinker = async (req, res, next) => {
    try {
        const result = await queryAllUserGroupLinker();
        console.log("Get All UserGroupLinker")
        return res.status(200).json(result.rows || [])
    }
    catch(error) {
        return next (error) // send error to middleware in index.js
    }
}

const getAllUsersByGroupId = async (req, res, next) => {
    try {
        const groupId = req.params.id;
        console.log(`Getting users with groupid: ${groupId}`)
        const result = await queryAllUsersByGroupId(groupId)
        if (result.rowCount === 0) {
            const error = new Error('Group not found')
            error.status = 404
            return next(error)
        }
        return res.status(200).json(result.rows)
    } catch (error) {
        return next(error)
    }
}
const getAllGroupsByAccountId = async (req, res, next) => {
    try {
        const accountId = req.params.id;
        console.log(`Getting groups with accountid: ${accountId}`)
        const result = await queryAllGroupsByAccountId(accountId)
        if (result.rowCount === 0) {
            const error = new Error('Account not found')
            error.status = 404
            return next(error)
        }
        return res.status(200).json(result.rows)
    } catch (error) {
        return next(error)
    }
}

const getAllByGroupIdAccountId = async (req, res, next) => {
    try {
        const { groupid, accountid } = req.params;
        console.log(`Getting groups with groupid: ${groupid} and accountid: ${accountid}`)
        const result = await queryAllByGroupIdAccountId(groupid, accountid)
        if (result.rowCount === 0) {
            const error = new Error('Group or Account not found')
            error.status = 404
            return next(error)
        }
        return res.status(200).json(result.rows)
    } catch (error) {
        return next(error)
    }
}

const postUserGroupLinker = async (req, res, next) => {
    const { userGroupLinker } = req.body
    try {
        if (!userGroupLinker.groupid || !userGroupLinker.accountid ) {
        const error = new Error('Missing groupid or accountid')
        error.status = 400
        return next(error)
        }
        const result = await queryPostUserGroupLinker(userGroupLinker.groupid, userGroupLinker.accountid)
        return res.status(201).json(result)
    } catch (error) {
        return next(error)
    }
}

const deleteByAccountId = async (req, res, next) => {
    const { accountid } = req.params
    try {
        console.log(`Deleting usergrouplinker with accountid: ${accountid}`)
        const result = await queryDeleteByAccountId(accountid)
        if (result.rowCount === 0) {
            const error = new Error('Account not found')
            error.status = 400
            return next(error)
        }
        return res.status(200).json({ accountid: accountid })
    } catch (error) {
        return next(error)
    }
}

const deleteByGroupId = async (req, res, next) => {
    const { groupid } = req.params
    try {
        console.log(`Deleting usergrouplinker with groupid: ${groupid}`)
        const result = await queryDeleteByGroupId(groupid)
        if (result.rowCount === 0) {
            const error = new Error('Group not found')
            error.status = 400
            return next(error)

        }
        return res.status(200).json({ groupid: groupid })
    } catch (error) {
        return next(error)
    }
}
const deleteByAccountIdGroupId = async (req, res, next) => {
    const { accountid, groupid } = req.params
    try {
        console.log(`Deleting usergrouplinker with accountid: ${accountid} and groupid: ${groupid}`)
        const result = await queryDeleteByAccountIdGroupId(accountid, groupid)
        if (result.rowCount === 0) {
            const error = new Error('Account or Group not found')
            error.status = 400
            return next(error)
        }
        return res.status(200).json({ accountid: accountid, groupid: groupid })
    }
    catch (error) {
        return next(error)
    }
}

export { 
    getAllUserGroupLinker, 
    getAllUsersByGroupId, 
    getAllGroupsByAccountId, 
    getAllByGroupIdAccountId,
    postUserGroupLinker, 
    deleteByAccountId, 
    deleteByGroupId, 
    deleteByAccountIdGroupId 
}
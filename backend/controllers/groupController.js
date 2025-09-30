// for all group table http endpoints
import { queryAllGroups, queryAllGroupsWithLimit, queryPostGroup, queryDeleteGroup, queryUpdateGroup } from "../models/group.js";

const postGroup= async (req, res, next) => {
    const { groups } = req.body
    try {
        if (!groups.fk_ownerid || !groups.groupname || !groups.groupdescription) {
            const error = new Error('Missing Group data')
            error.status = 400
            return next(error)
        }

        const result = await queryPostGroup(groups.fk_ownerid, groups.groupname, groups.groupdescription)
        return res.status(201).json(result)
    } catch (error) {
        return next(error)
    }
}

const updateGroup= async (req, res, next) => {
    const { groups } = req.body
    try {
        if (!groups.groupid || !groups.fk_ownerid || !groups.groupname || !groups.groupdescription) {
            const error = new Error('Missing Group update data')
            error.status = 400
            return next(error)
        }

        const result = await queryUpdateGroup(groups.groupid, groups.fk_ownerid, groups.groupname, groups.groupdescription)
        return res.status(201).json(result)
    } catch (error) {
        return next(error)
    }
}

const getAllGroups = async (req, res, next) => {
    try {
        const result = await queryAllGroups()
        console.log("get all Groups")
        return res.status(200).json(result.rows)
    } catch (error) {
        return next (error) // send error to middleware in index.js
    }
}

const getAllGroupsWithLimit = async (req, res, next) => {
    try {
        
        const result =  await queryAllGroupsWithLimit(req.params.limit)
        console.log("get all Groups with limit "+ req.params.limit)
        return res.status(200).json(result.rows)
    } catch (error) {
        return next (error)
    }
}

const deleteGroup = async (req, res, next) => {
    const { id } = req.params

    try {
        console.log(`Deleting Group with id: ${id}`)
        const result = await queryDeleteGroup(id)
        if (result.rowCount === 0) {
            const error = new Error('Group not found')
            error.status = 400
            return next(error)
        }
        return res.status(200).json({ id: id })
    } catch (error) {
        return next(error)
    }
}
export{
    postGroup, getAllGroups, getAllGroupsWithLimit, updateGroup, deleteGroup
}



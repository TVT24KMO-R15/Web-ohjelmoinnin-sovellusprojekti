// for all group table http endpoints
import { queryAllGroups, queryGroupById, queryPostGroup, queryDeleteGroup, queryUpdateGroup } from "../models/group.js";

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
        return res.status(200).json(result.rows || [])
    } catch (error) {
        return next (error) // send error to middleware in index.js
    }
}

const getGroupById = async (req, res, next) => {
    const { id } = req.params

    try {
        console.log(`Deleting Group with id: ${id}`)
        const result = await queryGroupById(id)
        if (result.rowCount === 0) {
            const error = new Error('Group not found')
            error.status = 404
            return next(error)
        }
        return res.status(200).json(result.rows[0])
    } catch (error) {
        return next(error)
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
    postGroup, getAllGroups, getGroupById, updateGroup, deleteGroup
}



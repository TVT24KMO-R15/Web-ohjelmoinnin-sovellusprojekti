// for all group table http endpoints
import { 
    queryAllGroups, 
    queryGroupById, 
    queryGroupBySearchWord, 
    queryGroupByOwnerId, 
    queryPostGroup, 
    queryDeleteGroup, 
    queryUpdateGroup } 
from "../models/group.js";
import { 
    queryPostUserGroupLinker, // to automatically add owner to group
    queryDeleteByGroupId // to remove linkers when group is deleted
} from "../models/userGroupLinker.js";

const postGroup= async (req, res, next) => {
   try {
        const ownerId = req.user.id;
        const { groupname, groupdescription } = req.body.groups;

        const result = await queryPostGroup(ownerId, groupname, groupdescription);
        // Automatically add the owner to the group user linker before sending response
        try {
            await queryPostUserGroupLinker(result.rows[0].groupid, ownerId);
        } catch (linkError) {
            // If linking fails, delete the created group or handle as needed
            return res.status(500).json({ error: "Failed to add owner to group: " + linkError.message });
        }
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const updateGroup= async (req, res, next) => {
    try {
        const ownerId = req.user.id;
        const groupId = req.params.id;
        
        if (!req.body.groups) {
            return res.status(400).json({ error: "Missing 'groups' object in request body" });
        }
        const { groupname, groupdescription } = req.body.groups;

        const existingGroup = await queryGroupById(groupId);
        if (existingGroup.rowCount === 0) {
            return res.status(404).json({ error: "Group not found" });
        }

        if (existingGroup.rows[0].fk_ownerid !== ownerId) {
            return res.status(403).json({ error: "You can only edit groups that you own" });
        }

        const result = await queryUpdateGroup(groupId, ownerId, groupname, groupdescription);
        
        res.json({ id: groupId, message: "Group updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
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
        console.log(`Getting Group with id: ${id}`)
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

const getGroupByOwnerId = async (req, res, next) => {
    const { ownerid } = req.params

    try {
        console.log(`getting groups by owner: ${ownerid}`)
        const result = await queryGroupByOwnerId(ownerid)
        if (result.rowCount === 0) {
            const error = new Error('Groups not found')
            error.status = 404
            return next(error)
        }
        return res.status(200).json(result.rows)
    } catch (error) {
        return next(error)
    }
}

const getGroupBySearchWord = async (req, res, next) => {
    const { word } = req.params

    try {
        console.log(`Searching for group named: ${word}`)
        const result = await queryGroupBySearchWord(word)
        
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

const deleteGroup = async (req, res, next) => {
    try {
        const ownerId = req.user.id;
        const groupId = req.params.id;

        const existingGroup = await queryGroupById(groupId);
        if (existingGroup.rowCount === 0) {
            return res.status(404).json({ error: "Group not found" });
        }

        if (existingGroup.rows[0].fk_ownerid !== ownerId) {
            return res.status(403).json({ error: "You can only delete groups that you own" });
        }

        // Attempt to delete user-group linkers first
        await queryDeleteByGroupId(groupId); 

        // Then delete the group
        const groupResult = await queryDeleteGroup(groupId, ownerId);
        if (groupResult.rowCount === 0) {
            return res.status(500).json({ error: "Failed to delete group after removing linkers." });
        }

        res.json({ message: "Group deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
export{ 
    postGroup, getAllGroups, getGroupById, getGroupByOwnerId, getGroupBySearchWord, updateGroup, deleteGroup
}



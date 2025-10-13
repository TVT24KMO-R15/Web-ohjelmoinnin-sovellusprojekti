// for all group table http endpoints
import { 
    queryAllGroups, 
    queryGroupById, 
    queryGroupBySearchWord, 
    queryGroupByOwnerId, 
    queryPostGroup, 
    queryDeleteGroup, 
    queryUpdateGroup,
    queryAllMembersByGroupId,
    queryMembershipStatus,
    queryTransferOwnership
} from "../models/group.js";
import { 
    queryPostUserGroupLinker, // to automatically add owner to group
    queryDeleteByGroupId, // to remove linkers when group is deleted
    queryDeleteByAccountIdGroupId // to remove specific user from group
} from "../models/userGroupLinker.js";
import { queryDeleteAcceptedRequest } from "../models/groupJoin.js";

const postGroup = async (req, res, next) => {
   try {
        const ownerId = req.user.id;
        console.log("Creating group for user: " + ownerId);

        if (!req.user || !req.user.id) {
            console.log("Group create: unauthorized")
            return res.status(401).json({ error: "Unauthorized" });
        }

        if (!req.body.groups) {
            console.log("Group create: missing 'groups' object")
            return res.status(400).json({ error: "Missing 'groups' object in request body" });
        }


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
        console.log(err.code)
        if (err.code === '23505') { // unique_violation
            return res.status(400).json({ error: "Group name already exists" });
        }
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


// router.get('/:id/accountid/:accountid', auth, getMembershipStatus) // to check if user is owner of the group
const getMembershipStatus = async (req, res, next) => {
    const userId = req.user.id;
    console.log("THIS USER ID IS FROM AUTH", userId);
    const groupId = req.params.id;
    console.log("THIS GROUP ID IS FROM PARAMS", groupId);
    const accountIdParam = req.params.accountid;
    console.log("THIS ACCOUNT ID IS FROM PARAMS", accountIdParam);

    try {
        console.log(`Checking membership status for user ${userId} in group ${groupId}`);

        // check auth user id with param id
        if (parseInt(userId) !== parseInt(accountIdParam)) {
            return res.status(403).json({ error: "Forbidden" });
        }

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        if (!groupId) {
            return res.status(400).json({ error: "Missing group ID" });
        }

        const groupResult = await queryGroupById(groupId);

        if (groupResult.rowCount === 0) {
            return res.status(404).json({ error: "Group not found" });
        }

        const isOwner = groupResult.rows[0].fk_ownerid === userId;

        return res.status(200).json({ isOwner });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getMembersList = async (req, res, next) => {
    const userId = req.user.id;
    const groupId = req.params.groupid;
    console.log("userid from auth:", userId);
    console.log("groupid from params:", groupId);
    try {
        const membershipResult = await queryMembershipStatus(groupId, userId);
        if (membershipResult.rowCount === 0) {
            return res.status(403).json({ error: "Forbidden" });
        }
        console.log(`Getting members list for group ${groupId}`);
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        if (!groupId) {
            return res.status(400).json({ error: "Missing group ID" });
        }
        const groupResult = await queryGroupById(groupId);

        if (groupResult.rowCount === 0) {
            return res.status(404).json({ error: "Group not found" });
        }
        const membersResult = await queryAllMembersByGroupId(groupId);
        return res.status(200).json(membersResult.rows || []);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const leaveGroup = async (req, res, next) => {
    const userId = req.user.id;
    const groupId = req.params.groupid;

    try {
        console.log(`User ${userId} attempting to leave group ${groupId}`);

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        if (!groupId) {
            return res.status(400).json({ error: "Missing group ID" });
        }

        const groupResult = await queryGroupById(groupId);
        if (groupResult.rowCount === 0) {
            return res.status(404).json({ error: "Group not found" });
        }

        if (groupResult.rows[0].fk_ownerid === userId) {
            return res.status(403).json({ error: "Group owner cannot leave the group. Delete the group instead." });
        }

        const membershipResult = await queryMembershipStatus(groupId, userId);
        if (membershipResult.rowCount === 0) {
            return res.status(403).json({ error: "You are not a member of this group" });
        }

        // delete accepted join request after leaving
        const resultDeleteAccepted = await queryDeleteAcceptedRequest(groupId, userId);
        // console.log("Result of deleting accepted join request:", resultDeleteAccepted);
        if (resultDeleteAccepted.rowCount === 0) {
            console.log("No accepted join request found to delete.");
        }

        // remove from ugl table after leaving
        const resultDeleteUGL = await queryDeleteByAccountIdGroupId(userId, groupId);
        // console.log("Result of deleting from user_group_linker:", resultDeleteUGL);
        if (resultDeleteUGL.rowCount === 0) {
            console.log("No entry found in user_group_linker to delete.");
        }

        console.log(`User ${userId} successfully left group ${groupId}`);
        return res.status(200).json({ message: "Successfully left the group" });
    } catch (err) {
        console.error("Error leaving group:", err);
        return res.status(500).json({ error: err.message });
    }
}

const transferOwnership = async (req, res, next) => {
    try {
        const currentOwnerId = req.user.id
        const groupId = req.params.id

        if (!req.body.newOwnerId) {
            return res.status(400).json({ error: "Missing newOwnerId in request body" })
        }

        const { newOwnerId } = req.body;

        // if group exists
        const existingGroup = await queryGroupById(groupId)
        if (existingGroup.rowCount === 0) {
            return res.status(404).json({ error: "Group not found" })
        }

        // if current user is the owner
        if (existingGroup.rows[0].fk_ownerid !== currentOwnerId) {
            return res.status(403).json({ error: "Only the group owner can transfer ownership" })
        }

        // if new owner is a member of the group
        const membershipResult = await queryMembershipStatus(groupId, newOwnerId)
        if (membershipResult.rowCount === 0) {
            return res.status(400).json({ error: "New owner must be a member of the group" })
        }

        // point of no return
        const result = await queryTransferOwnership(groupId, newOwnerId)
        
        console.log(`Ownership of group ${groupId} transferred from ${currentOwnerId} to ${newOwnerId}`)
        res.status(200).json({ 
            message: "Ownership transferred successfully",
            group: result.rows[0]
        })
    } catch (err) {
        console.error("Error transferring ownership:", err)
        res.status(500).json({ error: err.message })
    }
}

export {
    postGroup, getAllGroups, getGroupById, getGroupByOwnerId, getGroupBySearchWord, updateGroup, deleteGroup, getMembershipStatus, getMembersList, leaveGroup, transferOwnership
}



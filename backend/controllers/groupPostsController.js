// for all group posts http endpoints
import { queryPostGroupPost, queryAllGroupPosts, queryGroupPostsByGroupId, queryUpdateGroupPost, queryDeleteGroupPost } from "../models/groupPosts.js";

const getAllGroupPosts = async (req, res, next) => {
    try {
        const result = await queryAllGroupPosts();
        console.log("Get All GroupPosts")
        return res.status(200).json(result.rows || [])
    } catch(error) {
        return next (error) // send error to middleware in index.js
    }
}

const getGroupPostsByGroupId = async (req, res, next) => {
        try {
        const groupId = req.params.id;    
        console.log(`Getting Group posts with groupid: ${groupId}`)
        const result = await queryGroupPostsByGroupId(groupId)
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

const postGroupPost = async (req, res, next) => {

    const result = await queryPostGroupPost(postid, groupid, posttext, movieid);
}

const updateGroupPost = async (req, res, next) => {

    const result = await queryUpdateGroupPost(postid, groupid, posttext, movieid);
}

const deleteGroupPost = async (req, res, next) => {

    const result = await queryDeleteGroupPost(postid, );
}

export{
    getAllGroupPosts, getGroupPostsByGroupId, postGroupPost, updateGroupPost, deleteGroupPost
}
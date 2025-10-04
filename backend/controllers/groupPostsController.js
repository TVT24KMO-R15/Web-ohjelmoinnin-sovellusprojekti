// for all group posts http endpoints
import {
    queryPostGroupPost,
    queryAllGroupPosts,
    queryGroupPostsByGroupId,
    queryGroupPostsByPostId,
    queryUpdateGroupPost,
    queryDeleteGroupPost
} from "../models/groupPosts.js";

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
        return res.status(200).json(result.rows)
    } catch (error) {
        return next(error)
    }
}
const getGroupPostsByPostId = async (req, res, next) => {
        try {
        const postId = req.params.id;    
        console.log(`Getting Group posts with postid: ${postId}`)
        const result = await queryGroupPostsByPostId(postId)
        if (result.rowCount === 0) {
            const error = new Error('Post not found')
            error.status = 404
            return next(error)
        }
        return res.status(200).json(result.rows)
    } catch (error) {
        return next(error)
    }
}

const postGroupPost = async (req, res, next) => {
      try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "User not authenticated" });
        }
        const accountid = req.user.id
        const { groupid, posttext, movieid } = req.body.groupposts;
        
        const result = await queryPostGroupPost(groupid, posttext, movieid, accountid);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const updateGroupPost = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "User not authenticated" });
        }
        const accountid = req.user.id
        const postid = req.params.id
        if (!req.body.groupposts) {
            return res.status(400).json({ error: "Missing 'groupposts' object in request body" });
        }
        const { posttext, movieid } = req.body.groupposts;
        const existingGroupPost = await queryGroupPostsByPostId(postid);

        if (existingGroupPost.rowCount === 0) {
            return res.status(404).json({ error: "Group post not found" });
        }

        if (existingGroupPost.rows[0].fk_accountid !== accountid) {
            return res.status(403).json({ error: "You can only edit group posts that you own" });
        }

        const result = await queryUpdateGroupPost(postid, posttext, movieid, accountid);

        res.status(200).json({ id: postid, message: "Group post updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    }

const deleteGroupPost = async (req, res, next) => {
      try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "User not authenticated" });
        }
        const accountid = req.user.id
        const postid = req.params.id;

        const existingPost = await queryGroupPostsByPostId(postid);
        if (existingPost.rowCount === 0) {
            return res.status(404).json({ error: "Post not found" });
        }

        if (existingPost.rows[0].fk_accountid !== accountid) {
            return res.status(403).json({ error: "You can only delete group posts that you own" });
        }
        const result = await queryDeleteGroupPost(postid, accountid);
        res.status(200).json({ message: "Group post deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
export{
    getAllGroupPosts, 
    getGroupPostsByGroupId, 
    getGroupPostsByPostId, 
    postGroupPost, 
    updateGroupPost, 
    deleteGroupPost
}
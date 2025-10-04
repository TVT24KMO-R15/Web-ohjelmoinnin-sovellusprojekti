import { queryPostCommentsByPostId, createPostComment, deletePostCommentById, queryPostCommentsByUserId, queryCheckGroupMembership } from '../models/postComment.js'

const getCommentById = async (req, res, next) => {
  // console.log("auth info: ", req.user)
  const accountid = req.user.id // commenting user id
  const postid = req.params.postid // post id to get comments for

  try {
    const isMember = await queryCheckGroupMembership(accountid, postid) // check if user is in group that owns the post
    if (!isMember) {
      return res.status(403).json({ error: "Forbidden" })
    }
    // console.log("is member of the group, fetching comments...")
    const result = await queryPostCommentsByPostId(postid) // once got membership status get all comments to the post
    console.log("get post comments by post id: " + postid)
    return res.status(200).json(result || [])
  } catch (error) {
    return next(error)
  }
}

const getCommentsByUserID = async (req, res, next) => {
  // console.log("auth info: ", req.user)
  const accountid = req.user.id
  try {
    const result = await queryPostCommentsByUserId(accountid)
    console.log("get post comments by user id: " + accountid)
    return res.status(200).json(result || [])
  } catch (error) {
    return next(error)
  }
}

const postComment = async (req, res, next) => {
  console.log("auth info: ", req.user)
  const userid = req.user.id
  // console.log("user id from auth: ", userid)

  const { postid, text } = req.body
  // console.log(req.body)
  try {
    const isMember = await queryCheckGroupMembership(userid, postid) // check membership
    if (!isMember) {
      return res.status(403).json({ error: "Forbidden: You must be a member of the group to comment on this post" })
    }
    
    const result = await createPostComment(postid, userid, text)
    console.log("new post comment created")
    return res.status(201).json(result)
  } catch (error) {
    return next(error)
  }
}


// todo add auth to this
const deleteComment = async (req, res, next) => {
  // console.log("auth info: ", req.user)
  const ownerId = req.user.id

  const commentid = req.params.id
  try {
    const result = await deletePostCommentById(commentid)
    console.log("post comment deleted with id: " + commentid)
    if(!result) {
      return res.status(404).json({ error: "Comment not found" })
    }
    return res.status(200).json(result)
  } catch (error) {
    return next(error)
  }
}

export { getCommentById, postComment, deleteComment, getCommentsByUserID }
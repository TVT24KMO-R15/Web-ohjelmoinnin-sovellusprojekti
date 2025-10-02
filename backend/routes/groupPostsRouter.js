import { Router } from "express";
import { auth } from '../helpers/authHelper.js'
import { getAllGroupPosts, getGroupPostsByGroupId, postGroupPost, deleteGroupPost, updateGroupPost } from "../controllers/groupPostsController.js"

const router = Router()

router.get('/', getAllGroupPosts)
router.get('/:id', getGroupPostsByGroupId)
router.post('/post', postGroupPost)
router.delete('/delete/:id', deleteGroupPost)
router.put('/update/:id', updateGroupPost)

export default router
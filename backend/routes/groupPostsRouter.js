import { Router } from "express";
import { auth } from '../helpers/authHelper.js'
import { 
    getAllGroupPosts, 
    getGroupPostsByGroupId, 
    getGroupPostsByPostId,
    postGroupPost, 
    deleteGroupPost, 
    updateGroupPost,
    deleteGroupPostAsOwner
} from "../controllers/groupPostsController.js"

const router = Router()

router.get('/', getAllGroupPosts)
router.get('/groupid/:id', auth, getGroupPostsByGroupId)
router.get('/postid/:id', getGroupPostsByPostId)
router.post('/post', auth, postGroupPost)
router.delete('/delete/:id', auth, deleteGroupPost)
router.delete('/delete/owner/:id', auth, deleteGroupPostAsOwner)
router.put('/update/:id', auth, updateGroupPost)

export default router
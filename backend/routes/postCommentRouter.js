import { Router } from 'express'
import { getCommentById, postComment, deleteComment, getCommentsByUserID } from '../controllers/postCommentController.js'
import { auth } from '../helpers/authHelper.js'


const router = Router()
router.get('/user/', auth, getCommentsByUserID) // get comments made by a user by user id
router.get('/:postid', auth, getCommentById) // get comments to a post by post id
router.post('/', auth, postComment)
router.delete('/:id', auth, deleteComment)

export default router
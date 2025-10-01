import { Router } from "express";
import { auth } from '../helpers/authHelper.js'
import { getAllGroups, getGroupById, postGroup, deleteGroup, updateGroup } from "../controllers/groupController.js"

const router = Router()

router.get('/', getAllGroups)
router.get('/:id', getGroupById)
router.post('/post', auth, postGroup)
router.delete('/delete', auth, deleteGroup)
router.put('/update', auth, updateGroup)

export default router
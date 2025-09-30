import { Router } from "express";

import { getAllGroups, getGroupById, postGroup, deleteGroup, updateGroup } from "../controllers/groupController.js"

const router = Router()

router.get('/', getAllGroups)
router.get('/:id', getGroupById)
router.post('/post', postGroup)
router.delete('/delete', deleteGroup)
router.put('/update', updateGroup)

export default router
import { Router } from "express";
import { auth } from '../helpers/authHelper.js'
import { getAllGroups, getGroupById, getGroupBySearchWord, postGroup, deleteGroup, updateGroup } from "../controllers/groupController.js"

const router = Router()

router.get('/', getAllGroups)
router.get('/:id', getGroupById)
router.get('/searchword/:word', getGroupBySearchWord)
router.post('/post', auth, postGroup)
router.delete('/delete/:id', auth, deleteGroup)
router.put('/update/:id', auth, updateGroup)

export default router
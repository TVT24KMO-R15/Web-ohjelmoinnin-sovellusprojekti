import { getAllUserGroupLinker, getAllUsersByGroupId, getAllGroupsByAccountId, postUserGroupLinker, deleteByAccountId, deleteByGroupId, deleteByAccountIdGroupId } from '../controllers/userGroupLinkerController.js'
import { Router } from 'express'
import { auth } from '../helpers/authHelper.js'

const router = Router()

router.get('/', getAllUserGroupLinker)
router.get('/groupid/:groupid', getAllUsersByGroupId)
router.get('/accountid/:accountid', getAllGroupsByAccountId)
router.post('/post', auth, postUserGroupLinker)
router.delete('/delete/accountid/:accountid', auth, deleteByAccountId)
router.delete('/delete/groupid/:groupid', auth, deleteByGroupId)
router.delete('/delete/accountid/:accountid/groupid/:groupid', auth, deleteByAccountIdGroupId)
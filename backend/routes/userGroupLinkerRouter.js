import { getAllUserGroupLinker, getAllUsersByGroupId, getAllGroupsByAccountId,getAllByGroupIdAccountId, postUserGroupLinker, deleteByAccountId, deleteByGroupId, deleteByAccountIdGroupId } from '../controllers/userGroupLinkerController.js'
import { Router } from 'express'
import { auth } from '../helpers/authHelper.js'

const router = Router()

router.get('/', getAllUserGroupLinker)
router.get('/groupid/:groupid', getAllUsersByGroupId)
router.get('/accountid/:accountid', getAllGroupsByAccountId)
router.get('/groupid/:groupid/accountid/:accountid', getAllByGroupIdAccountId)
router.post('/post', auth, postUserGroupLinker)
router.delete('/delete/accountid/:accountid', auth, deleteByAccountId)
router.delete('/delete/groupid/:groupid', auth, deleteByGroupId)
router.delete('/delete/accountid/:accountid/groupid/:groupid', auth, deleteByAccountIdGroupId)

export default router
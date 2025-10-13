import { getAllUserGroupLinker, getAllUsersByGroupId, getAllGroupsByAccountId,getAllByGroupIdAccountId, postUserGroupLinker, deleteByAccountId, deleteByGroupId, deleteByAccountIdGroupId } from '../controllers/userGroupLinkerController.js'
import { Router } from 'express'
import { auth } from '../helpers/authHelper.js'

const router = Router()

router.get('/', getAllUserGroupLinker)
router.get('/groupid/:groupid', getAllUsersByGroupId)
router.get('/accountid/:accountid', getAllGroupsByAccountId)
router.get('/groupid/:groupid/accountid/:accountid', getAllByGroupIdAccountId) // check if user is member of group
router.post('/post', auth, postUserGroupLinker)  // add user to group
router.delete('/delete/accountid/:accountid', auth, deleteByAccountId) // remove all groups from user
router.delete('/delete/groupid/:groupid', auth, deleteByGroupId) // remove all users from group
router.delete('/delete/accountid/:accountid/groupid/:groupid', auth, deleteByAccountIdGroupId) // remove user from group

export default router
import { Router } from "express";
import { auth } from "../helpers/authHelper.js";
import { getAllAccounts, getAccountById, postRegister, accountSignIn, postDelete, putAccountPassword, putAccountUsername, putAccountEmail, getUsernameById } from "../controllers/accountsController.js"

const router = Router()

// note, route is /users/
router.get('/', getAllAccounts) // created for testing's sake
router.get('/getid/:accountid', getUsernameById) // get account by id without auth for public favourites page
router.get('/:accountid', getAccountById)
router.post('/signin', accountSignIn)
router.post('/register', postRegister)
router.post('/delete', postDelete)
router.put('/updatepassword', auth, putAccountPassword)
router.put('/updateusername', auth, putAccountUsername)
router.put('/updateemail', auth, putAccountEmail)

export default router
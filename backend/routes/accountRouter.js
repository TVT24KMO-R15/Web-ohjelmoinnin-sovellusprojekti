import { Router } from "express";
import { auth } from "../helpers/authHelper.js";
import { getAllAccounts, getAccountById, getAccountEmailById, postRegister, accountSignIn, postDelete, putAccountPassword, putAccountUsername, putAccountEmail, getUsernameById } from "../controllers/accountsController.js"

const router = Router()

// note, route is /users/
// router.get('/', getAllAccounts) // created for testing's sake NOT ANYMORE
router.get('/getid/:accountid', getUsernameById) // get account by id without auth for public favourites page
router.get('/:accountid', auth, getAccountById) // get account details by id with auth for profile page
// NOTE TO SELF, IF WE WANT TO REMOVE EMAILS FROM FRONTEND CHANGE THIS TO RETURN USERNAME
router.get('/getemail/:accountid', getAccountEmailById) // get email by id without auth for AccountEmailById component 
router.post('/signin', accountSignIn)
router.post('/register', postRegister)
router.post('/delete', postDelete)
router.put('/updatepassword', auth, putAccountPassword)
router.put('/updateusername', auth, putAccountUsername)
router.put('/updateemail', auth, putAccountEmail)

export default router
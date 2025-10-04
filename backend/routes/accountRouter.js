import { Router } from "express";

import { getAllAccounts, getAccountById, postRegister, accountSignIn, postDelete, putAccountPassword } from "../controllers/accountsController.js"

const router = Router()

// note, route is /users/
router.get('/', getAllAccounts) // created for testing's sake
router.get('/:accountid', getAccountById)
router.post('/signin', accountSignIn)
router.post('/register', postRegister)
router.post('/delete', postDelete)
router.put('/updatepassword', putAccountPassword)

export default router
import { Router } from "express";

import { getAllAccounts, postRegister, accountSignIn, postDelete } from "../controllers/accountsController.js"

const router = Router()

// note, route is /users/
router.get('/', getAllAccounts) // created for testing's sake
router.post('/signin', accountSignIn)
router.post('/register', postRegister)
router.post('/delete', postDelete)

export default router
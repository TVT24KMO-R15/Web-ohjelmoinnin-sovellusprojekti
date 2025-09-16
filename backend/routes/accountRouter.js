import { Router } from "express";

import { getAllAccounts, accountSignIn } from "../controllers/accountsController.js"

const router = Router()

// note, route is /users/
router.get('/', getAllAccounts) // created for testing's sake
router.post('/signin', accountSignIn)
// router.get('/signup', ) do later

export default router
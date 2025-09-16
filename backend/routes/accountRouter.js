import { Router } from "express";

import { getAllAccounts, postRegister } from "../controllers/accountsController.js"

const router = Router()

// note, route is /users/
router.get('/', getAllAccounts) // created for testing's sake
// router.get('/signin', ) do later
router.post('/register', postRegister)

export default router
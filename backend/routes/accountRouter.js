import { Router } from "express";

import { getAllAccounts } from "../controllers/accountsController.js"

const router = Router()

// note, route is /users/
router.get('/', getAllAccounts) // created for testing's sake
// router.get('/signin', ) do later
// router.get('/signup', ) do later

export default router
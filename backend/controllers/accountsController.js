// for all account table http endpoints
import { selectAllAccounts, sendSignUp } from "../models/account.js"
import { hash } from "bcrypt"

const getAllAccounts = async (req, res, next) => {
    try {
        const result = await selectAllAccounts()
        return res.status(200).json(result.rows || [])
    } catch (error) {
        return next (error) // send error to middleware in index.js
    }
}




/*
url:port/users/register
USAGE:
    { "account":
        {
            "email": "log@in.pass",
            "password": "pass",
            "userName": "name"
        }
    }
*/
const postRegister = async (req, res, next) => {
    console.log("register endpoint called succesfully")
    const { account } = req.body

    try { 
        if (!account || !account.email || !account.password || !account.userName) {
            return next(new Error("Email, username and password are required"))
        }

        const hashedPassword = await hash(account.password, 10)
        // query result contains: accountid, username, email, password and registrationDate
        const result = await sendSignUp(account.email, hashedPassword, account.userName)

        res.status(201).json({
            id: result.rows[0].id, 
            email: account.email,
            userName: account.userName
        })
    console.log("Registered successfully")
    } catch  (error) {
        console.log("ERROR: backend/controllers/accountsController.js caught exception")
        return next(error)
    }
}

export { getAllAccounts, postRegister }
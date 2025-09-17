// for all account table http endpoints
import { selectAllAccounts, sendSignUp, accountLogin } from "../models/account.js"
import { hash, compare } from "bcrypt"
import jwt from 'jsonwebtoken'

const { sign } = jwt

const getAllAccounts = async (req, res, next) => {
    try {
        const result = await selectAllAccounts()
        console.log("get all accounts")
        return res.status(200).json(result.rows || [])
    } catch (error) {
        return next (error) // send error to middleware in index.js
    }
}

const accountSignIn = async (req, res, next) => {
    const { account } = req.body
    try {
        if (!account || !account.email || !account.password) {
            const error = new Error('Email and password are required')
            error.status = 400
            return next(error)
        }

        const result = await accountLogin(account.email)

        if (result.rows.lenght === 0) {
            const error = new Error('User not found')
            error.status = 404
            return next(error)
        }

        const dbUser = result.rows[0]

        compare(account.password, dbUser.password, (err, isMatch) => {
            if (err) return next(err)

            if (!isMatch) {
                const error = new Error('Invalid password')
                error.status = 401
                return next(error)
            }
        })

        const token = sign({ account: dbUser.email }, process.env.JWT_SECRET_KEY)
        res.status(200).json({
            id: dbUser.id,
            email: dbUser.email,
            token
        })

    } catch (error) {
        return next(error)
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

export { getAllAccounts, postRegister, accountSignIn }

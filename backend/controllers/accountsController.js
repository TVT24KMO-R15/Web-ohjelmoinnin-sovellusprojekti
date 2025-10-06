// for all account table http endpoints
import { selectAllAccounts, selectAccountById, sendSignUp, accountLogin, getPasswordByID, getAccountIDByUsernameEmail, deleteAccount, updatePassword, updateUsername, updateEmail } from "../models/account.js"
import { hash, compare } from "bcrypt"
import jwt from 'jsonwebtoken'

const { sign } = jwt

const getAllAccounts = async (req, res, next) => {
    try {
        const result = await selectAllAccounts()
        console.log("get all accounts")
        return res.status(200).json(result.rows || [])
    } catch (error) {
        return next(error) // send error to middleware in index.js
    }
}

const getAccountById = async (req, res, next) => {
    if (!req.params.accountid || req.params.accountid === 'undefined') {
        const error = new Error('Account id is required')
        error.status = 400
        return next(error)
    }
    try {
        const result = await selectAccountById(req.params.accountid)
        console.log('get details for account: ' + req.params.accountid)
        return res.status(200).json(result.rows || [])
    } catch (error) {
        return next(error)
    }
}

const accountSignIn = async (req, res, next) => {
    console.log("signing in...")
    const { account } = req.body
    try {
        if (!account || !account.email || !account.password) {
            const error = new Error('Email and password are required')
            error.status = 400
            return next(error)
        }

        const result = await accountLogin(account.email)

        if (result.rows.length === 0) {
            const error = new Error('Invalid email or password')
            error.status = 404
            return next(error)
        }

        const dbUser = result.rows[0]

        compare(account.password, dbUser.password, (err, isMatch) => {
            if (err) return next(err)

            if (!isMatch) {
                const error = new Error('Invalid email or password')
                error.status = 401
                return next(error)
            }

            const token = sign({ 
                id: dbUser.accountid,
                account: dbUser.email,
                username: dbUser.username 
            }, process.env.JWT_SECRET_KEY)
            res.status(200).json({
                id: dbUser.accountid,
                email: dbUser.email,
                username: dbUser.username,
                token
            })
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
            "username": "name"
        }
    }
*/
const postRegister = async (req, res, next) => {
    console.log("register endpoint called succesfully")
    const { account } = req.body

    try {
        if (!account || !account.email || !account.password || !account.username) {
            return next(new Error("Email, username and password are required"))
        }

        const hashedPassword = await hash(account.password, 10)
        // query result contains: accountid, username, email, password and registrationDate
        const result = await sendSignUp(account.email, hashedPassword, account.username)

        res.status(201).json({
            id: result.rows[0].accountid,
            email: account.email,
            username: account.username
        })
        console.log("Registered successfully")
    } catch (error) {
        console.log("ERROR: backend/controllers/accountsController.js caught exception")
        return next(error)
    }
}



/* USAGE:
POST http://localhost:3000/users/delete
    { "account": 
        {
            "email": "x",
            "password": "y",
            "username": "z"
        }
    }
    ^^ these parameters should come from frontend when a user requests account deletion, ask for password verification?
*/

const postDelete = async (req, res, next) => {
    try {
        const { account } = req.body

        const resultAccountID = await getAccountIDByUsernameEmail(account.username, account.email)
        // console.log("result account id ")
        // console.log(resultAccountID)

        // if result has nothing, logging empty resultAccountID: rows: [],
        if (!resultAccountID.rows[0]) {
            const error = new Error(`Couldnt get accountID with username ${account.username} and email ${account.email}`)
            error.status = 404
            return next(error)
        }
        const accountID = resultAccountID.rows[0].accountid

        const resultDBPassword = await getPasswordByID(accountID)
        // console.log("reult from db query get passwd by id: ")
        // console.log(resultDBPassword)

        if (resultDBPassword.rows.length === 0 || !resultDBPassword.rows[0]) {
            const error = new Error('Couldnt get dbPassword for account deletion')
            error.status = 404
            return next(error)
        }
        const dbPassword = resultDBPassword.rows[0].password


        // when deleting account, check that password from user input and database match
        const isMatch = await compare(account.password, dbPassword)

        if (!isMatch) {
            const error = new Error('Passwords do not match, cant delete account')
            error.status = 401
            return next(error)
        }

        // point of no return
        if (isMatch) {
            console.log("deleting account with id: " + accountID)
            const result = await deleteAccount(accountID)
            res.status(200).json({
                status: "success"
            })
        }

    } catch (error) {
        if (error.message.includes("update or delete on table \"account\" violates foreign key constraint")) {
            const error = new Error("Cannot delete account: user is owner of a group. Delete the group first.")
            error.status = 400
            return next(error)
        }
        console.log("postDelete in accountsController.js throwing error")
        return next(error)
    }
}

/* USAGE:
PUT http://localhost:3000/users/updatepassword
    { "account": 
        {
            "email": "x",
            "username": "z",
            "password": "y",
            "newPassword": "z"
        }
    }
    ^^ these parameters should come from frontend when a user requests password change, ask for password verification?
*/

const putAccountPassword = async (req, res, next) => {
    const accountid = req.user.id // get auth account id to match to db id from email and username
    // console.log("account id from auth token: " + accountid)
    try {
        if (!accountid) {
            const error = new Error('No account id found from auth token, cant update password')
            error.status = 401
            return next(error)
        }
        const { account } = req.body

        const resultAccountID = await getAccountIDByUsernameEmail(account.username, account.email)
        // console.log("result account id ")
        // console.log(resultAccountID)
        // if result has nothing, logging empty resultAccountID: rows: [],
        if (!resultAccountID.rows[0]) {
            const error = new Error(`Couldnt get accountID with username ${account.username} and email ${account.email}`)
            error.status = 404
            return next(error)
        }

        // console.log("account id from email and username: " + resultAccountID.rows[0].accountid)
        if (parseInt(resultAccountID.rows[0].accountid) !== parseInt(accountid)) {
            const error = new Error('Account id from auth token and account id from email and username do not match, cant update password')
            error.status = 401
            return next(error)
        }

        const resultDBPassword = await getPasswordByID(accountid)

        if (resultDBPassword.rows.length === 0 || !resultDBPassword.rows[0]) {
            const error = new Error('Couldnt get dbPassword for password update')
            error.status = 404
            return next(error)
        }

        const dbPassword = resultDBPassword.rows[0].password

        // when updating password, check that password from user input and database match
        const isMatch = await compare(account.password, dbPassword)

        if (!isMatch) {
            const error = new Error('Passwords do not match, cant update password')
            error.status = 401
            return next(error)
        }

        // point of no return
        if (isMatch) {
            console.log("changing password for account with id: " + accountid)
            const hashedPassword = await hash(account.newPassword, 10)

            const result = await updatePassword(accountid, hashedPassword)
            res.status(200).json({
                status: "success"
            })
        }
    } catch (error) {
        console.log("putAccountPassword in accountsController.js throwing error")
        return next(error)
    }
}


const putAccountUsername = async (req, res, next) => {
    const accountid = req.user.id
    const oldUsername = req.user.username
    const oldEmail = req.user.account
    console.log("user details from auth: id: " + accountid + ", username: " + oldUsername + ", email: " + oldEmail)
    console.log("Updating username for account id from auth token: " + accountid)
    try {
        const { account } = req.body
        console.log("Request body account: ", account)
        if (!account || !account.email || !account.username || !account.newUsername) {
            const error = new Error('Email, current username and new username are required')
            error.status = 400
            return next(error)
        }

        if (account.username !== oldUsername || account.email !== oldEmail) {
            const error = new Error('Username or email in request body do not match to auth token details, cant update username')
            error.status = 401
            return next(error)
        }
        // check that accountid matches to email and username
        const resultAccountID = await getAccountIDByUsernameEmail(account.username, account.email)

        if (resultAccountID.rows.length === 0) {
            const error = new Error('Could not find account with given email and username')
            error.status = 404
            return next(error)
        }

        if(accountid !== resultAccountID.rows[0].accountid) {
            const error = new Error('Account id from auth token and account id from email and username do not match, cant update username')
            error.status = 401
            return next(error)
        }

        // update username in db
        const updateResult = await updateUsername(accountid, account.newUsername)
        console.log("Username updated in db, new username: ", updateResult)
        return res.status(200).json({ status: 'success' })
    } catch (error) {
        console.log("putAccountUsername in accountsController.js throwing error")
        return next(error)
    }
}

const putAccountEmail = async (req, res, next) => {
    try {
        const { account } = req.body
        console.log("Request body account: ", account)
        if (!account || !account.email || !account.username || !account.newEmail) {
            const error = new Error('Current email, username and new email are required')
            error.status = 400
            return next(error)
        }
        const result = await getAccountIDByUsernameEmail(account.username, account.email)
        if (result.rows.length === 0) {
            const error = new Error('Could not find account with given email and username')
            error.status = 404
            return next(error)
        }
        const accountID = result.rows[0].accountid
        // update email in db
        const updateResult = await updateEmail(accountID, account.newEmail)
        return res.status(200).json({ status: 'success' })
    } catch (error) {
        console.log("putAccountEmail in accountsController.js throwing error")
        return next(error)
    }
}

export { getAllAccounts, getAccountById, postRegister, accountSignIn, postDelete, putAccountPassword, putAccountUsername, putAccountEmail }

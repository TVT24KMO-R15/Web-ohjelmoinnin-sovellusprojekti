// for all user table sql queries
import { pool } from "../helpers/dbHelper.js"

const selectAllAccounts = async () => {
    return await pool.query("select * from account")
}

const selectAccountById = async ( accountid ) => {
    return await pool.query(`SELECT * FROM account WHERE accountid = $1`, [accountid])
}

const accountLogin = async ( email ) => {
    return await pool.query(`SELECT * FROM account WHERE email = $1`, [email]
    )
}

const sendSignUp = async (email, pass, uname) => {
    return await pool.query("INSERT INTO account (email, password, username) VALUES ($1, $2, $3) RETURNING * " ,
        [email, pass, uname]
    )
}

// get only password from account, used for verifying password on account deletion request,
// todo could secure this further by requiring maybe email and username aswell
const getPasswordByID = async (accountID) => {
    return await pool.query("SELECT password FROM account WHERE accountid=$1" ,
        [accountID]
    )
}

const getAccountIDByUsernameEmail = async (username, email) => {
    return await pool.query("SELECT accountid FROM account WHERE username=($1) AND email=($2)" ,
        [username, email]
    )
}

const deleteAccount = async (accountID) => {
    return await pool.query("DELETE FROM account WHERE accountid=$1" , 
        [accountID]
    )
}

const updatePassword = async (accountID, hashedPassword) => {
    return await pool.query(`UPDATE account SET password = $2 WHERE accountid = $1`, [accountID, hashedPassword])
}

const updateUsername = async (accountID, newUsername) => {
    return await pool.query(`UPDATE account SET username = $2 WHERE accountid = $1`, [accountID, newUsername])
}

const updateEmail = async (accountID, newEmail) => {
    return await pool.query(`UPDATE account SET email = $2 WHERE accountid = $1`, [accountID, newEmail])
}

const queryGetUsername = async (accountid) => {
    return await pool.query(`SELECT username FROM account WHERE accountid = $1`, [accountid])
}

export { selectAllAccounts, selectAccountById, sendSignUp, accountLogin, getPasswordByID, getAccountIDByUsernameEmail, deleteAccount, updatePassword, updateUsername, updateEmail , queryGetUsername }

// for all user table sql queries
import { pool } from "../helpers/dbHelper.js"

const selectAllAccounts = async () => {
    return await pool.query("select * from account")
}

const accountLogin = async ( email ) => {
    console.log('sql query')
    return await pool.query(`SELECT * FROM account WHERE email = $1`, [email]
    )
}

const sendSignUp = async (email, pass, uname) => {
    return await pool.query("INSERT INTO account (email, password, username) VALUES ($1, $2, $3) RETURNING * " ,
        [email, pass, uname]
    )
}

export { selectAllAccounts, sendSignUp, accountLogin }

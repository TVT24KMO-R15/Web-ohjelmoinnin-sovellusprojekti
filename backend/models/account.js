// for all user table sql queries
import { pool } from "../helpers/dbHelper.js"

const selectAllAccounts = async () => {
    return await pool.query("select * from account")
}

const accountLogin = async (email) => {
    return await pool.query('SELECT * FROM account WHERE email = $1', [email])
}

export { selectAllAccounts, accountLogin }
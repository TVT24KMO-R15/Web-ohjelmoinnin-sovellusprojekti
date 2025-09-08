// for all user table sql queries
import { pool } from "../helpers/dbHelper.js"

const selectAllAccounts = async () => {
    return await pool.query("select * from account")
}

export { selectAllAccounts }
// for all user table http endpoints
import { selectAllAccounts } from "../models/account.js"

const getAllAccounts = async (req, res, next) => {
    try {
        const result = await selectAllAccounts()
        return res.status(200).json(result.rows || [])
    } catch (error) {
        return next (error) // send error to middleware in index.js
    }
}

export { getAllAccounts }
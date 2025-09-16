// for all user table http endpoints
import { selectAllAccounts, accountLogin } from "../models/account.js"

const getAllAccounts = async (req, res, next) => {
    try {
        const result = await selectAllAccounts()
        return res.status(200).json(result.rows || [])
    } catch (error) {
        return next (error) // send error to middleware in index.js
    }
}

const accountSignIn = async (req, res, next) => {
    const { user } = req.body
    if (!user || !user.email || !user.password) {
        const error = new Error('Email and password are required')
        error.status = 400
        return next(error)
    }
    
    try {
        const result = await accountLogin(user.email)
        if (err) return next(err)

        if (result.rows.lenght === 0) {
            const error = new Error('User not found')
            error.status = 404
            return next(error)
        }

        const dbUser = result.rows[0]

        compare(user.password, dbUser.password, (err, isMatch) => {
            if (err) return next(err)

            if (!isMatch) {
                const error = new Error('Invalid password')
                error.status = 401
                return next(error)
            }
        })

        const token = sign({ user: dbUser.email }, process.env.JWT_SECRET_KEY)
        res.status(200).json({
            id: dbUser.id,
            email: dbUser.email,
            token
        })

    } catch (error) {
        return next(error)
    }

}

export { getAllAccounts, accountSignIn }
import { generateAccessToken, verifyRefreshToken } from "../helpers/tokenHelper.js"
import { hashToken, selectRefreshTokenByAccountAndHash } from "../models/refreshToken.js"
import { selectAccountById } from "../models/account.js"

export const refreshAccessToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken

        if (!refreshToken) {
            const error = new Error('Refresh token not found')
            error.status = 401
            return next(error)
        }

        // verify token signature and expiration
        const decoded = await verifyRefreshToken(refreshToken)

        // hash token to compare with database
        const tokenHash = hashToken(refreshToken)

        // verify token not revoked and still valid in database
        const dbResult = await selectRefreshTokenByAccountAndHash(decoded.id, tokenHash)

        if (dbResult.rows.length === 0) {
            const error = new Error('Refresh token has been revoked or expired')
            error.status = 403
            return next(error)
        }

        // get user details
        const userResult = await selectAccountById(decoded.id)
        
        if (userResult.rows.length === 0) {
            const error = new Error('User not found')
            error.status = 404
            return next(error)
        }

        const user = userResult.rows[0]

        // generate new access token from db info
        const newAccessToken = generateAccessToken({
            id: decoded.id,
            account: user.email,
            username: user.username
        })

        // return new token
        res.setHeader('Authorization', `Bearer ${newAccessToken}`)
        res.status(200).json({ message: 'Token refreshed successfully' })

    } catch (error) {
        error.status = 403
        error.message = 'Invalid or expired refresh token'
        return next(error)
    }
}

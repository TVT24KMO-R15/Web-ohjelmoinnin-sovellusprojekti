// for all refresh_tokens table sql queries
import { pool } from '../helpers/dbHelper.js'
import crypto from 'crypto'

const hashToken = (token) => {
    return crypto.createHash('sha256').update(token).digest('hex')
}

const insertRefreshToken = async (accountId, tokenHash, expiresAt) => {
    return await pool.query(
        `INSERT INTO refresh_tokens (accountid, token_hash, expires_at)
         VALUES ($1, $2, $3)
         RETURNING id`,
        [accountId, tokenHash, expiresAt]
    )
}

const selectRefreshTokenByAccountAndHash = async (accountId, tokenHash) => {
    return await pool.query(
        `SELECT id FROM refresh_tokens
         WHERE accountid = $1 
         AND token_hash = $2 
         AND revoked = FALSE
         AND expires_at > NOW()`,
        [accountId, tokenHash]
    )
}

const updateRevokeRefreshToken = async (accountId, tokenHash) => {
    return await pool.query(
        `UPDATE refresh_tokens
         SET revoked = TRUE
         WHERE accountid = $1 AND token_hash = $2`,
        [accountId, tokenHash]
    )
}

const updateRevokeAllUserTokens = async (accountId) => {
    return await pool.query(
        `UPDATE refresh_tokens
         SET revoked = TRUE
         WHERE accountid = $1 AND revoked = FALSE`,
        [accountId]
    )
}

export { 
    hashToken, 
    insertRefreshToken, 
    selectRefreshTokenByAccountAndHash, 
    updateRevokeRefreshToken, 
    updateRevokeAllUserTokens 
}

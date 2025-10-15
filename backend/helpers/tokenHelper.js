import jwt from 'jsonwebtoken'
const { sign, verify } = jwt

// create a token with user info as payload, and expiry time
export const generateAccessToken = (payload) => {
    console.log("generating access token with payload:", payload);
    return sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m'
    })
}

// create long lived refresh token from user id 
export const generateRefreshToken = (payload) => {
    console.log("generating refresh token with payload:", payload);
    return sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d'
    })
}

// verify that the refresh token is valid
export const verifyRefreshToken = (token) => {
    console.log("verifying refresh token:", token);
    return new Promise((resolve, reject) => {
        verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) reject(err)
            else resolve(decoded)
        })
    })
}

// set the refresh token as an HTTP-only cookie in the response
export const setRefreshTokenCookie = (res, refreshToken) => {
    console.log("setting refresh token cookie:", refreshToken);
    const isProduction = process.env.NODE_ENV === 'production'; // when deploying to https server, use secure cookies
    
    // set cookie options to response object
    res.cookie('refreshToken', refreshToken, { // name of the cookie and value
        httpOnly: true, // not accessible via JavaScript
        secure: isProduction, // only sent over HTTPS in production
        sameSite: isProduction ? 'none' : 'lax', // cross-site cookie for production, lax for local dev so browsers dont complain
        maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days in milliseconds
    })
}


// clear the refresh token cookie in the response
export const clearRefreshTokenCookie = (res) => {
    console.log("clearing refresh token cookie");
    const isProduction = process.env.NODE_ENV === 'production';
    
    // remove cookie from response object
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax'
    })
}

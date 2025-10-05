// authentication middleware
import jwt from 'jsonwebtoken'

const { verify } = jwt
const auth = (req,res,next) => {
    let token = req.headers['authorization']
    // console.log("Authenticating token: ", token)
    if (token && token.includes("Bearer ")) {
        token = token.split(" ")[1] // get token part after "Bearer "
    }

    if(!token) {
        console.log("No token provided")
        return res.status(401).json({ message: 'No token provided' })
    }

    verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if(err) {
            console.log("Failed to authenticate token")
            return res.status(401).json({ message: 'Failed to authenticate token' })
        }
        // console.log("Token authenticated, user id: ", decoded.id)
        req.user = decoded
        // console.log("req.user set to: ", req.user)
        next()
    })
}

export { auth }
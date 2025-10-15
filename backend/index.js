// -- module imports --
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

// -- route imports --
import usersRouter from './routes/accountRouter.js'
import tmdbRouter from './routes/tmdbRouter.js'
import favoriteMoviesRouter from './routes/favoriteMoviesRouter.js';
import reviewRouter from './routes/reviewsRouter.js'
import groupRouter from './routes/groupRouter.js'
import groupPostsRouter from './routes/groupPostsRouter.js'
import groupJoinRouter from './routes/groupJoinRouter.js'
import userGroupLinker from './routes/userGroupLinkerRouter.js'
import postCommentRouter from './routes/postCommentRouter.js'
import refreshTokenRouter from './routes/refreshTokenRouter.js'

dotenv.config()

// -- express config-- 
const app = express()
app.use(cors({
    origin: true,
    credentials: true,
    exposedHeaders: ['Authorization']
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// -- routes
app.use('/api/users', usersRouter)
app.use('/api/api/tmdb', tmdbRouter)
app.use("/api/favorites", favoriteMoviesRouter);
app.use('/api/reviews', reviewRouter)
app.use('/api/groupjoin', groupJoinRouter)
app.use('/api/groups', groupRouter)
app.use('/api/postcomment', postCommentRouter)
app.use('/api/groupposts', groupPostsRouter)
app.use('/api/usergrouplinker', userGroupLinker)
app.use('/api/refresh', refreshTokenRouter)

// get env mode to verify test mode
app.get('/__env', (req, res) => {
    res.json({ env: process.env.NODE_ENV || 'unknown' })
})

// -- middleware
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
    console.log("server env: " + process.env.NODE_ENV)
})

// error handling middleware, called by next (err)
app.use((err, req, res, next) => {
    console.error("Error came from: " + req.path)
    const errCode = err.status || 500 // fallback to 500 incase error doesnt send html code for some reason
    res.status(errCode).json({
        error: {
            message: err.message,
            status: errCode
        }
    })
    console.log("ERROR MESSAGE FROM index.js: " + err.message + "\nHTTP Code: " + errCode)
})
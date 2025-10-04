// -- module imports --
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

// -- route imports --
import usersRouter from './routes/accountRouter.js'
import tmdbRouter from './routes/tmdbRouter.js'
import favoriteMoviesRouter from './routes/favoriteMoviesRouter.js';
import reviewRouter from './routes/reviewsRouter.js'
import groupRouter from './routes/groupRouter.js'
import groupPostsRouter from './routes/groupPostsRouter.js'
import groupJoinRouter from './routes/groupJoinRouter.js'

dotenv.config()

const swaggerOptions = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Movie app API",
      description: "API docs for movie app"
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`
      }
    ],
  },
  apis: ["./routes/*.js", "./controllers/*.js"]
}

// -- express config-- 
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// -- routes
app.use('/users', usersRouter)
app.use('/api/tmdb', tmdbRouter) // url/api/tmdb
app.use("/favorites", favoriteMoviesRouter);
app.use('/reviews', reviewRouter)
app.use('/groupjoin', groupJoinRouter)
app.use('/groups', groupRouter)
app.use('/groupposts', groupPostsRouter)

if (process.env.NODE_ENV === "development") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerOptions)))
}

// -- middleware
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
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
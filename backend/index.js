// -- module imports --
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// -- file imports --
// import someroute from './routes/someroute.js'

dotenv.config()

// -- express config-- 
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// -- routes
// app.use('/someroute', someroute)

// -- middleware
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`)
})

// error handling middleware, called by next (err)
app.use((err, req, res, next) => {
    const errCode = err.status || 500 // fallback to 500 incase error doesnt send html code for some reason
    res.status(errCode).json({
        error: {
            message: err.message,
            status: errCode
        }
    })
    console.log("ERROR RECEIVED TO index.js: " + err.message + "\nHTTP Code: " + err.status) // dont use fallback here incase something failed
})
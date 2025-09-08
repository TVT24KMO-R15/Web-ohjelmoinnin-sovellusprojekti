// database connection
import pkg from 'pg'
import dotenv from 'dotenv'

const dbEnvironment = process.env.NODE_ENV || 'dev' // db environment will be testing or dev

dotenv.config()

const { Pool } = pkg

/**
 * Opens a new database connection 
 * @returns Instance of pkg.pool
 */
const openDB = async () => {
    const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: dbEnvironment === "development" ? process.env.DB_NAME : process.env.TEST_DB_NAME,
        port: process.env.DB_PORT,
        password: process.env.DB_PASSWORD
    })
    // console.log("connected to database")
    return pool
}

export { openDB as pool }
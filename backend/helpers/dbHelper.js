// database connection
import pkg from 'pg'
import dotenv from 'dotenv'

const dbEnvironment = process.env.NODE_ENV || 'development' // db environment will be testing or dev

dotenv.config()

const { Pool } = pkg

/**
 * Opens a new database connection 
 * @returns Instance of pkg.pool
 */
const openDB = () => {
    const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: dbEnvironment === "development" ? process.env.DB_NAME : process.env.TEST_DB_NAME, // config for using separate test db
        port: process.env.DB_PORT,
        password: process.env.DB_PASSWORD,
        ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
    })
    return pool
}

const pool = openDB()

export { pool }
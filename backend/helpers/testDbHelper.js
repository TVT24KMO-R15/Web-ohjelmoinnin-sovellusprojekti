// for initializing test database when running tests
import fs from 'fs'
import path from 'path'
import { pool } from './dbHelper.js'
import { hash } from 'bcrypt'

const __dirname = import.meta.dirname

const initializeTestDb = () => {
    const sql = fs.readFileSync(path.resolve(__dirname, '../sql/createDatabase_V2.sql'), 'utf8')
    // console.log(sql)
    pool.query(sql, (err) => {
        if (err) {
            console.error('Error initializing test database:', err)
        } else {
            console.log('Test database initialized successfully')
        }
    })
}

const insertTestUser = (user) => {
    hash(user.password, 10, (err, hashedPassword) => {
        if(err) {
            console.log('Error hashing password:', err)
            return
        }
        pool.query(`INSERT INTO account (email, username, password) VALUES ($1, $2, $3)`, [user.email, user.username, hashedPassword],
        (err, result) => {
            if (err) {
                console.log('Error inserting test user:', err)
            } else {
                console.log('Test user inserted successfully')
            }
        })
    })
}
export { initializeTestDb, insertTestUser }
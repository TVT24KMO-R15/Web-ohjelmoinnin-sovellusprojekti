import { expect } from "chai"
import { initializeTestDb, insertTestUser } from "../helpers/testDbHelper.js"
import { verifyNodeEnv } from "../helpers/verifyNodeEnv.js"

verifyNodeEnv()

describe("Testing user management", () => {
    const user1 = { email: "test01@test.com", password: "password01", username: "testUser01" }
    const user2 = { email: "test02@test.com", password: "password02", username: "testUser02" }
    before(() => {
        initializeTestDb()
        // insertTestUser(user2)
    })

    it("should register", async () => {
        const response = await fetch(`http://localhost:${process.env.PORT}/api/users/register`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ account: user1 })
        })
        const data = await response.json()
        expect(response.status).to.equal(201)
        expect(data).to.include.all.keys(["id", "email", "username"])
        expect(data.email).to.equal(user1.email)
        global.user1Id = data.id
    })

    it('should log in', async () => {
        const response = await fetch(`http://localhost:${process.env.PORT}/api/users/signin`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ account: user1 })
        })
        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.include.all.keys(["id", "email", "username"])
        expect(data.email).to.equal(user1.email)
        
        // grab tokens from headers
        const authHeader = response.headers.get('Authorization')
        expect(authHeader).to.exist
        expect(authHeader).to.match(/^Bearer .+/)
        global.user1Token = authHeader.replace('Bearer ', '')
        
        // grab token from cookies
        const cookies = response.headers.get('set-cookie')
        expect(cookies).to.exist
        expect(cookies).to.include('refreshToken')
        global.user1Cookies = cookies
    })

    it('should log out', async () => {
        const response = await fetch(`http://localhost:${process.env.PORT}/api/users/logout`, {
            method: "post",
            headers: { 
                "Content-Type": "application/json",
                "Cookie": global.user1Cookies
            }
        })
        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.have.property('message', 'Logged out successfully')

        // make sure cookie doesnt exist anymore
        const cookies = response.headers.get('set-cookie')
        if (cookies) {
            expect(cookies).to.match(/refreshToken=;|refreshToken=deleted/)
        }
    })

    it('should log back in after logout', async () => {
        const response = await fetch(`http://localhost:${process.env.PORT}/api/users/signin`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ account: user1 })
        })
        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.include.all.keys(["id", "email", "username"])
        expect(data.email).to.equal(user1.email)

        // see new access token from headers
        const authHeader = response.headers.get('Authorization')
        expect(authHeader).to.exist
        expect(authHeader).to.match(/^Bearer .+/)
        global.user1Token = authHeader.replace('Bearer ', '')

        // see new refresh token from cookies
        const cookies = response.headers.get('set-cookie')
        expect(cookies).to.exist
        expect(cookies).to.include('refreshToken')
        global.user1Cookies = cookies
    })
})
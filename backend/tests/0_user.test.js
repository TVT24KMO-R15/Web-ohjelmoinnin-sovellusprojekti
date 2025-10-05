import { expect } from "chai"
import { initializeTestDb, insertTestUser } from "../helpers/testDbHelper.js"



describe("Testing user management", () => {
    const user1 = { email: "test01@test.com", password: "password01", username: "testUser01" }
    const user2 = { email: "test02@test.com", password: "password02", username: "testUser02" }
    before(() => {
        initializeTestDb()
        // insertTestUser(user2)
    })

    it("should register", async () => {
        const response = await fetch(`http://localhost:${process.env.PORT}/users/register`, {
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
        const response = await fetch(`http://localhost:${process.env.PORT}/users/signin`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ account: user1 })
        })
        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.include.all.keys(["id", "email", "username", "token"])
        expect(data.email).to.equal(user1.email)
        global.user1Token = data.token
    })
})
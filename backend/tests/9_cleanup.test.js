import { expect } from "chai"
import { verifyNodeEnv } from "../helpers/verifyNodeEnv.js"

verifyNodeEnv()

describe("Cleaning up", () => {
    const user1 = { email: "test01@test.com", password: "password01", username: "testUser01" }
    

    it("should not delete account when group owner", async () => {
        const response = await fetch(`http://localhost:${process.env.PORT}/users/delete`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ account: user1 })
        })
        const data = await response.json()
        expect(response.status).to.equal(400)
        expect(data).to.have.property('error')
        expect(data.error).to.have.property('message', 'Cannot delete account: user is owner of a group. Delete the group first.')
    })


    it("should delete owned group", async () => {
        const response = await fetch(`http://localhost:${process.env.PORT}/groups/delete/${global.group1Id}`, {
            method: "delete",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${global.user1Token}` }
        })
        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.have.property('message')
        expect(data.message).to.equal('Group deleted successfully')
    })

    it("should delete account", async () => {
        const response = await fetch(`http://localhost:${process.env.PORT}/users/delete`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ account: user1 })
        })
        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.have.property('status')
        expect(data.status).to.equal('success')
    })

    it('should not log in after account deletion', async () => {
        const response = await fetch(`http://localhost:${process.env.PORT}/users/signin`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ account: user1 })
        })
        const data = await response.json()
        expect(response.status).to.equal(404)
        expect(data).to.have.property('error')
        expect(data.error).to.have.property('message', 'Invalid email or password')
        expect(data.error).to.have.property('status', 404)
    })


})
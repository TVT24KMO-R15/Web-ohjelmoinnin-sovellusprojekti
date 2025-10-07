import { expect } from "chai"
import { verifyNodeEnv } from "../helpers/verifyNodeEnv.js"

verifyNodeEnv()

describe("Testing favorites", () => {
    const favorite1 = { email: "test01@test.com", movieId: 12345 }

    it('should add a favorite movie', async () => {
        const response = await fetch(`http://localhost:${process.env.PORT}/favorites/add`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(favorite1)
        })
        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.have.property('message', 'Added to favorites')
    })

    it('should not add a duplicate favorite movie', async () => {
        const response = await fetch(`http://localhost:${process.env.PORT}/favorites/add`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(favorite1)
        })
        const data = await response.json()
        expect(response.status).to.equal(400)
        expect(data).to.have.property('error', 'Movie already in favorites')
    })

    it('should get all favorite movies for a user', async () => {
        const response = await fetch(`http://localhost:${process.env.PORT}/favorites/?email=${favorite1.email}`, {
            method: "get",
            headers: { "Content-Type": "application/json" }
        })
        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.be.an('object')
        expect(data.favorites).to.be.an('array')
        expect(data.favorites).to.include(favorite1.movieId)
    })

    it('should delete a favorite movie', async () => {
        const response = await fetch(`http://localhost:${process.env.PORT}/favorites/delete`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(favorite1)
        })
        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.have.property('message', 'Removed from favorites')
    })

})
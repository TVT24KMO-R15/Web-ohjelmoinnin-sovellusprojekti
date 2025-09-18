import { expect } from "chai"
import { initializeTestDb, insertTestUser } from "../helpers/testDbHelper.js"

describe("Testing tmdb backend functionality", () => {

    it("should get popular movies", async () => {
        const response = await fetch("http://localhost:3000/api/tmdb/popular")
        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.be.an("object").that.is.not.empty
        expect(data["results"][0]).to.include.all.keys(["title", "id"])
    })

    it("should find movies with a search term", async () => {
        const searchWord = "123"
        const response = await fetch(`http://localhost:3000/api/tmdb/search/${searchWord}`)
        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.be.an("object").that.is.not.empty
        expect(data["results"][0]).to.include.all.keys(["title", "id"])
    })

    it("should get movie details with movie id", async () => {
        const movieId = "157336-interstellar"
        const response = await fetch(`http://localhost:3000/api/tmdb/details/${movieId}`)
        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.be.an("object").that.is.not.empty
        expect(data).to.include.all.keys(["title", "id"])
    })
})

describe("Testing user management", () => {
    const user1 = { email: "test01@test.com", password: "password01", username: "testUser01" }
    const user2 = { email: "test02@test.com", password: "password02", username: "testUser02" }
    before(() => {
        initializeTestDb()
        // insertTestUser(user2)
    })

    it("should register", async () => {

        const response = await fetch("http://localhost:3000/users/register", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ account: user1 })
        })
        const data = await response.json()
        expect(response.status).to.equal(201)
        expect(data).to.include.all.keys(["id", "email", "username"])
        expect(data.email).to.equal(user1.email)
    })

    it('should log in', async () => {
        const response = await fetch("http://localhost:3000/users/signin", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ account: user1 })
        })
        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.include.all.keys(["id", "email", "token"])
        expect(data.email).to.equal(user1.email)
    })
})
import { expect } from "chai"
import { initializeTestDb, insertTestUser } from "../helpers/testDbHelper.js"

describe("Testing tmdb backend functionality", () => {
    before(() => {
        initializeTestDb()
    })

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
    const user = { email: "test01@test.com", password: "password01", userName: "testUser01" }
    before(() => {
        insertTestUser(user)
    })

    it("should register", async () => {

        const response = await fetch("http://localhost:3000/users/register", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ account: user })
        })
        const data = await response.json()
        expect(response.status).to.equal(201)
        expect(data).to.include.all.keys(["id", "email", "userName"])
        expect(data.email).to.equal(newUser.email)
    })

    it('should log in', async () => {
        const response = await fetch("http://localhost:3000/users/signin", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ account: user })
        })
        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.include.all.keys(["id", "email", "token"])
        expect(data.email).to.equal(user.email)
    })
})
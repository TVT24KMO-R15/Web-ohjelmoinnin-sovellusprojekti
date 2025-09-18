import { expect } from "chai"

describe("Testing basic backend functionality", () => {
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
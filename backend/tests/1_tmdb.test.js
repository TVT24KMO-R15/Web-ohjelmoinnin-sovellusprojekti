import { expect } from "chai"
import { verifyNodeEnv } from "../helpers/verifyNodeEnv.js"

verifyNodeEnv()

describe("Testing tmdb backend functionality", () => {
    it("should get popular movies", async () => {
        const response = await fetch(`http://localhost:${process.env.PORT}/api/tmdb/popular`)
        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.be.an("object").that.is.not.empty
        expect(data["results"][0]).to.include.all.keys(["title", "id"])
    })

    it("should find movies with a search term", async () => {
        const searchWord = "123"
        const response = await fetch(`http://localhost:${process.env.PORT}/api/tmdb/search/${searchWord}`)
        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.be.an("object").that.is.not.empty
        expect(data["results"][0]).to.include.all.keys(["title", "id"])
    })

    it("should get movie details with movie id", async () => {
        const movieId = "157336"
        const response = await fetch(`http://localhost:${process.env.PORT}/api/tmdb/details/${movieId}`)
        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.be.an("object").that.is.not.empty
        expect(data).to.include.all.keys(["title", "id"])
    })

    it("Should get movie collection details", async () => {
        const collectionID = 10; // star wars collection
        const response = await fetch(`http://localhost:${process.env.PORT}/api/tmdb/collection/${collectionID}`);
        const data = await response.json()
        // console.log("should get movie collections data: \n", data);
        expect(response.status).to.equal(200);
        expect(data).to.include.keys(["id", "name", "parts"])
    })


})
import { expect } from "chai"
import { verifyNodeEnv } from "../helpers/verifyNodeEnv.js"

verifyNodeEnv()

describe("testing reviews", () => {
    const movieId = 803796
    let reviewId = null

    it('should post a review', async () => {
        const review = {
            movieid: movieId,
            accountid: global.user1Id,
            stars: 5,
            reviewtext: "pure cinema"
        }

        const response = await fetch(`http://localhost:${process.env.PORT}/api/reviews/post`, {
            method: "post",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${global.user1Token}`,
                "Cookie": global.user1Cookies
            },
            body: JSON.stringify({ review })
        })
        const data = await response.json()
        expect(response.status).to.equal(201)
        expect(data).to.have.property('rows')
        expect(data.rows[0]).to.have.property('reviewid')
        reviewId = data.rows[0].reviewid
    })

    it('should browse all reviews', async () => {
        const response = await fetch(`http://localhost:${process.env.PORT}/api/reviews/all/`, {
            method: "get",
            headers: { "Content-Type": "application/json" }
        })
        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.be.an('array')
        expect(data.length).to.be.greaterThan(0)
    })

    it('should update a review', async () => {
        const review = {
            movieid: movieId,
            accountid: global.user1Id,
            stars: 4,
            reviewtext: "ok maybe it doesnt deserve 5 stars, still good",
        }

        const response = await fetch(`http://localhost:${process.env.PORT}/api/reviews/put`, {
            method: "put",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${global.user1Token}`,
                "Cookie": global.user1Cookies
            },
            body: JSON.stringify({ review })
        })
        expect(response.status).to.equal(201)
    })

    it('should delete a review', async () => {
        expect(reviewId).to.not.be.null
        const response = await fetch(`http://localhost:${process.env.PORT}/api/reviews/delete/${reviewId}`, {
            method: "delete",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${global.user1Token}`,
                "Cookie": global.user1Cookies
            }
        })
        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.have.property('message', 'Review deleted successfully')
    })
})
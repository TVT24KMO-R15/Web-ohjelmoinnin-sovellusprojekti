import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AccountEmailById from '../components/common/AccountEmailById'
import './Reviews.css'
import noPoster from '../assets/noPoster.png'
import Pagination from '../components/search/Pagination'

export default function Reviews() {
  const [reviewsWithDetails, setReviewsWithDetails] = useState([])
  const [filter, setFilter] = useState({ stars: '', orderby: 'date' })
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1) // how many pages of reviews are there
  const [currentPage, setCurrentPage] = useState(1) // which page of reviews is currently shown

  const handleChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value })
  }

  const getPageCount = async () => { // get total amount of pages from backend
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews/pageamount`)
      const data = await res.json()
      // console.log("fetched page amount", data.pageamount)
      setTotalPages(data.pageamount || 1)
    } catch (err) {
      console.error('Failed to fetch page amount:', err)
      setTotalPages(1)
    }
  }

  const handlePageChange = (newPage) => { // update current page when pagination is used
    // console.log("handlePageChange called: page changed to: " + newPage)
    setCurrentPage(newPage) // set the current page to pagination selection, which makes a new axios request with page number change 
  }

  useEffect(() => {
    getPageCount()
  }, [])


  useEffect(() => {
    (async () => {
      try {
        const reviewsRes = await fetch(`${import.meta.env.VITE_API_URL}/reviews/frompage/${currentPage}`)
        const reviews = await reviewsRes.json()

        if (!reviews?.length) {
          setReviewsWithDetails([])
          setLoading(false)
          return
        }

        const reviewsWithMovies = await Promise.all(
          reviews.map(async (review) => {
            try {
              const movieRes = await fetch(
                `${import.meta.env.VITE_API_URL}/api/tmdb/details/${review.movieid}`
              )
              const movieDetails = await movieRes.json()
              return { review, movieDetails }
            } catch {
              return {
                review,
                movieDetails: {
                  poster_path: null,
                  title: 'Unknown Movie',
                  id: review.movieid,
                },
              }
            }
          })
        )

        setReviewsWithDetails(reviewsWithMovies)
      } catch (err) {
        console.error('Failed to fetch data:', err)
      } finally {
        setLoading(false)
      }
    })()
  }, [currentPage])

  if (loading) return <div>Loading...</div>

  const filteredReviews = reviewsWithDetails
    .filter(
      (item) =>
        !filter.stars || Number(item.review.stars) === Number(filter.stars)
    )
    .sort((a, b) => {
      if (filter.orderby === 'date') {
        const dateA = new Date(
          a.review.reviewdate 
        )
        const dateB = new Date(
          b.review.reviewdate 
        )
        return dateB - dateA
      }

      if (filter.orderby === 'stars') {
        return b.review.stars - a.review.stars
      }

      return 0
    })

  return (
    <div className="reviewpage">
      <h1>Reviews</h1>

      <div className="filters">
        <div>
          <label htmlFor="stars">Filter rating:</label>
          <select
            id="stars"
            name="stars"
            onChange={handleChange}
            value={filter.stars}
          >
            <option value="">All ratings</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="orderby">Order by:</label>
          <select
            id="orderby"
            name="orderby"
            onChange={handleChange}
            value={filter.orderby}
          >
            <option value="date">Date</option>
            <option value="stars">Stars</option>
          </select>
        </div>
      </div>

      <div className="reviews-container">
        {!filteredReviews.length ? (
          <p>No reviews found.</p>
        ) : (
          filteredReviews.map((item) => (
            <article
              key={item.review.id}
              className="reviewborder2"
            >
              <div className="reviewImageDiv">
                <img
                  src={
                    item.movieDetails.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item.movieDetails.poster_path}`
                      : noPoster
                  }
                  alt={`${item.movieDetails.title} poster`}
                />
              </div>

              <div className="reviewDetailsDiv">
                <Link
                  to={`/movies/${item.movieDetails.id}`}
                  className="popularmovielink"
                >
                  <h3>{item.movieDetails.title}</h3>
                </Link>

                <div className="reviewer">
                  <AccountEmailById property={item.review.fk_accountid} />
                </div>

                {(item.review.reviewtext) ? <p key={item.review.reviewid}>{item.review.reviewtext}</p> : <p className='nowrittenreview'>No written review</p>}

                <div className="review-meta">
                  <h3>Stars: {item.review.stars}</h3>
                  <span className="date">
                    Date: {String(item.review.reviewdate).substring(0, 10)}
                     
                  </span>
                </div>
              </div>
            </article>
          ))
        )}
        <Pagination currentPage={currentPage} totalPages={Math.ceil(totalPages)} onPageChange={handlePageChange} />
      </div>
    </div>
  )
}

import { useState, useEffect, useCallback } from 'react'
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
    setCurrentPage(1) // reset page on filter change
  }

  const getPageCount = useCallback(async () => { // get total amount of pages from backend
    try {
      const params = new URLSearchParams() // use url builder for backend
      if (filter.stars) {
        params.append('stars', filter.stars) // add ?stars= to url when filtering
      }
      
      const url = `${import.meta.env.VITE_API_URL}/reviews/filtered/pageamount?${params.toString()}`
      const res = await fetch(url)
      const data = await res.json()
      console.log(data)
      // console.log("fetched page amount", data.pageamount)
      setTotalPages(data.pageamount || 1)
    } catch (err) {
      // console.log('Failed to fetch page amount:', err)
      setTotalPages(1)
    }
  }, [filter.stars])

  const handlePageChange = (newPage) => { // update current page when pagination is used
    // console.log("handlePageChange called: page changed to: " + newPage)
    setCurrentPage(newPage) // set the current page to pagination selection, which makes a new axios request with page number change 
  }

  useEffect(() => {
    getPageCount()
  }, [filter.stars, getPageCount]) // get new page count when filters change


  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        // build query for backend
        const params = new URLSearchParams()
        if (filter.stars) {
          params.append('stars', filter.stars)
        }
        if (filter.orderby) {
          params.append('orderby', filter.orderby)
        }
        
        const url = `${import.meta.env.VITE_API_URL}/reviews/filtered/frompage/${currentPage}?${params.toString()}`
        const reviewsRes = await fetch(url)
        const reviews = await reviewsRes.json()
        console.log(reviews)

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
  }, [currentPage, filter.stars, filter.orderby]) // build new query when page or filters change

  if (loading) return <div>Loading...</div>

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
        {!reviewsWithDetails.length ? (
          <p>No reviews found.</p>
        ) : (
          reviewsWithDetails.map((item) => (
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

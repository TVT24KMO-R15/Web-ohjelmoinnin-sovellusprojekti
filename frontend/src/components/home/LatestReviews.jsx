import {React, useState, useEffect} from 'react'
import '../myprofile/ReviewsPreview.css'
import ReviewsPreviewRow from '../myprofile/ReviewsPreviewRow'

import './LatestReviews.css'

import { Link } from 'react-router-dom'

export default function ReviewsPreview() {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    //setReviews([])
    const address = import.meta.env.VITE_API_URL + `/reviews/all/5` //homepage preview limited to 5 reviews
    console.log(address)
    fetch(address)
      .then(response => response.json())
      .then(json => {
        //console.log(json.rows)
        setReviews(json)
        console.log(reviews)
      }
      )
      .catch(err => {
        console.error('Failed to fetch reviews', err)
        //setReviews([])
      })
  }, [])

  return (
    <div className='latestreviews'>
      <h2>Latest Reviews</h2>
      <div className='latestreviewshere'>
        {reviews.map(item =>
          (<ReviewsPreviewRow key={item.movieid} property={item} />)
        )}
      </div>
      <Link to='./reviews' className='linkseeall'>See all</Link>
    </div>
  )
}
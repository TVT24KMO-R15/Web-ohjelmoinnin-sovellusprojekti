import {React, useState, useEffect} from 'react'
import "./ReviewsPreview.css"
import ReviewsPreviewRow from './ReviewsPreviewRow.jsx'

import { useUser } from '../../context/UseUser'

import { Link } from 'react-router-dom'

export default function ReviewsPreview() {
  const account = useUser()
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    //setReviews([])
    const address = import.meta.env.VITE_API_URL + `/reviews/${account.user.id}`
    console.log(address)
    fetch(address)
      .then(response => response.json())
      .then(json => {
        console.log(json.rows)
        setReviews(json.rows)
        //console.log(reviews)
      }
      )
      .catch(err => {
        console.error('Failed to fetch reviews', err)
        //setReviews([])
      })
  }, [])

  return (
    <div>
      <h2>My Reviews</h2>

      {reviews.map(item =>
        (<ReviewsPreviewRow key={item.movieid} property={item} />)
      )}
      <Link to='./myreviews' className='linkseeall'>See all</Link>
    </div>
  )
}

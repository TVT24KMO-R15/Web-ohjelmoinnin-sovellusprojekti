import {React, useState, useEffect} from 'react'
import "./ReviewsPreview.css"
import ReviewsPreviewRow from './ReviewsPreviewRow.jsx'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { useUser } from '../../context/UseUser'


export default function ReviewsPreview() {
  const account = useUser()
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    //setReviews([])
    const address = import.meta.env.VITE_API_URL + `/reviews/${account.user.id}/5` //preview limited to 5 reviews
    const headers = { Authorization: `Bearer ${account.user.token}` }
    //console.log(address)
    axios(address, {headers, withCredentials: true})
      .then(response => {
        //console.log(response.data.rows)
        setReviews(response.data.rows)
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
      <Link className='popularmovielink' to={'/myaccount/myreviews'}><h2>My Reviews</h2></Link>

      {reviews.map(item =>
        (<ReviewsPreviewRow key={item.movieid} property={item} />)
      )}
      <Link to='./myreviews' className='linkseeall'>See all</Link>
    </div>
  )
}

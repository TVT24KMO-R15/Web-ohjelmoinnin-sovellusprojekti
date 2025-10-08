import React from 'react'
import './MyReviewsComponent.css'
import axios from "axios"

import { useUser } from '../../../context/UseUser'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function MyReviewsComponent(property) {

  const [loading, setLoading] = useState(true)
  const [review, setReview] = useState(property)
  const [reviewAndDetails, setReviewAndDetails] = useState({review: 'null', details: {'poster_path':''}})




  function getDetails() {
    if (review != {}) {
      //this part gets movie details for each review
      
      //console.log('getting details')
      //console.log(review.property.movieid)
      
      const address1 = import.meta.env.VITE_API_URL + `/api/tmdb/details/${review.property.movieid}`
      //console.log(address1)

      fetch(address1)
        .then(response => response.json())
        .then(json => {
          //console.log(json)
          const apuobjekti = {review: review.property, details: json}
          setReviewAndDetails(apuobjekti)
          //console.log(apuobjekti)
        })
      }
     else {
            console.log('reviews is empty')
          }

    

    if (review != {}){
      //console.log('loading: '+ loading)
      setLoading(false)
    }
  }

  useEffect(getDetails, [])
  
  if (loading) {
    // console.log('loading: '+ loading)
    return (
    <div>
      Loading...
    </div>)
  }

  if (!loading) {
    return (
      <div>
        
        <div>
          
          <article className='myReviewsArticle'>
            <div className='reviewImageDiv'>
              {(reviewAndDetails.details["poster_path"]) ? <img src={"https://image.tmdb.org/t/p/w500" + reviewAndDetails.details["poster_path"]}></img> : <img src={"../src/assets/noPoster.png"}></img>}
            </div>
            <div className='reviewDetailsDiv'>
              
              <Link to={`/movies/${reviewAndDetails.details.id}`} className='popularmovielink'><h3>{reviewAndDetails.details.title}</h3></Link>
              {(reviewAndDetails.review.reviewtext) ? <p key={reviewAndDetails.review.reviewid}>{reviewAndDetails.review.reviewtext}</p> : <p className='nowrittenreview'>No written review</p>}
              <h3>Stars: {reviewAndDetails.review.stars}</h3>
              
            </div>
          </article>
        </div>
      </div>
    )
  }
}

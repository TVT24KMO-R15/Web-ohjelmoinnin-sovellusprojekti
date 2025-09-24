import React from 'react'
import './MyReviewsComponent.css'
import axios from "axios"

import { useUser } from '../../../context/UseUser'
import { useState } from 'react'
import { useEffect } from 'react'

export default function MyReviewsComponent() {
  const account = useUser()
  const [loading, setLoading] = useState(true)
  const [reviews, setReviews] = useState([])
  const [reviewsAndDetails, setReviewsAndDetails] = useState([])

  
  useEffect(() => {
    //setReviews([])
    const address = import.meta.env.VITE_API_URL + `/reviews/${account.user.id}`

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
      
    }

  , [])



  function getDetails() {
    if (reviews != []) {
      //this part gets movie details for each review
      setReviewsAndDetails([])
      console.log('getting details')
      const apulista = []
      reviews.forEach(element => {
        const address1 = import.meta.env.VITE_API_URL + `/api/tmdb/details/${element.movieid}`
        console.log(address1)
        apulista.push(address1)
      });
      console.log(apulista)

      const fetchPromises = apulista.map(endpoint => fetch(endpoint))

      Promise.all(fetchPromises)
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(data => {
          console.log(data)
          const apulista2 = []
          for (let index = 0; index < data.length; index++) {
            const element = data[index];
            apulista2.push({review: reviews[index], details: element})
            
          }
          setReviewsAndDetails(apulista2)
        })
      }
     else {
            console.log('reviews is empty')
          }

    

    if (reviews != []){
      console.log('loading: '+ loading)
      setLoading(false)
    }
  }

  useEffect(getDetails, [reviews])
  
  if (loading) {
    console.log('loading: '+ loading)
    return (
    <div>
      Loading...
    </div>)
  }

  if (!loading) {
    return (
      <div>
        <h2>My Reviews</h2>
        <div>
          {reviewsAndDetails.map(item =>
          (<article key={item.review.movieid} className='myReviewsArticle'>
            <div className='reviewImageDiv'>
              {(item.details["poster_path"]) ? <img src={"https://image.tmdb.org/t/p/w500" + item.details["poster_path"]}></img> : <img src={"../src/assets/noPoster.png"}></img>}
            </div>
            <div className='reviewDetailsDiv'>
              <h3>{item.details.title}</h3>
              <p>"{item.review.reviewtext}"</p>
              <h3>Stars: {item.review.stars}</h3>
            </div>
          </article>))}
        </div>
      </div>
    )
  }
}

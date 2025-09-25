import {React, useState, useEffect} from 'react'
import MyReviewsComponent from '../../components/myprofile/myreviews/MyReviewsComponent'
import { useUser } from '../../context/UseUser'

export default function MyReviews() {
  const account = useUser()
    const [loading, setLoading] = useState(true)
    const [reviews, setReviews] = useState([])
    //const [reviewsAndDetails, setReviewsAndDetails] = useState([])
  
    
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

  return (
    <div>
      <h2>My Reviews</h2>
    {reviews.map(item =>
    (<MyReviewsComponent key={item.movieid} property={item} />)
    )}
    
    </div>
  )
}

import { React, useState, useEffect } from 'react'
import MyReviewsComponent from '../../components/myprofile/myreviews/MyReviewsComponent'
import { useUser } from '../../context/UseUser'
import axios from 'axios'
import PostReview from '../../components/singlemovie/PostReview'

export default function MyReviews() {
  const account = useUser()
  const [loading, setLoading] = useState(true)
  const [reviews, setReviews] = useState([])
  const [postReviewOpen, setPostReviewOpen] = useState(false);
  const [reloadState, setReloadState] = useState(false);
  const [movieToEdit, setMovieToEdit] = useState('');


  useEffect(() => {
    //setReviews([])
    console.log('reload: '+ reloadState)
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

    , [reloadState])

  const removeReview = (deleted) => {
    axios.delete(import.meta.env.VITE_API_URL + `/reviews/delete/${deleted}`)
      .then(response => {
        setReviews(reviews.filter(item => item.reviewid !== deleted))

      })
      .catch(error => {
        alert(error.response ? error.response.data.error.message : error)
      })

  }

  return (
    <div>
      <h2>My Reviews</h2>
      {reviews.map(item =>
      (<div className='reviewborder'>
        <MyReviewsComponent key={item.movieid} property={item} />
        <div className='deletebuttondiv'>
          <button className='deletebutton' onClick={() => removeReview(item.reviewid)}>Remove Review</button>
        
          <button className='deletebutton' onClick={() => {setMovieToEdit(item.movieid); setPostReviewOpen(true); } }>Edit Review</button>
          {postReviewOpen && <PostReview key={movieToEdit} onClose={() => { setPostReviewOpen(false); }} property={'put'} onUpdate={() => setReloadState(!reloadState)} movie={movieToEdit} />}
        </div>
      </div>
      ))}

    </div>
  )
}

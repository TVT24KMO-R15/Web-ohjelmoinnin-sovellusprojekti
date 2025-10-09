import React, { useState } from 'react'
import GroupPostsListing from './GroupPostsListing.jsx'
import './GroupPostsSection.css'
import { useUser } from '../../context/UseUser.js'
import axios from 'axios'

export default function GroupPostsSection({ groupId }) {
  const [addNewPostHidden, setAddNewPostHidden] = useState(true)
  const account = useUser()
  const [updateListing, setUpdateListing] = useState(false)

  const [postText, setPostText] = useState('')
  const [movieId, setMovieId] = useState(null)

  const [originalTitle, setOriginalTitle] = useState('')
  const [showtime, setShowtime] = useState(null)
  const [theatreId, setTheatreId] = useState(null)
  const [posterUrl, setPosterUrl] = useState('')

  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    setPostText(e.target.value)
    console.log(postText)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('here')

    try {
      const payload = {
        groupposts: {
          groupid: groupId,
          posttext: postText,
          movieid: movieId,
          finnkino_original_title: originalTitle,  // xml tag originalTitle
          finnkino_showtime: showtime,        // xml tag ShowStart
          finnkino_theatre_id: theatreId,      // oulu finnkino ID
          finnkino_poster_url: posterUrl       // xml tag EventLargeImagePortrait
        }
      }

      const headers = { Authorization: `Bearer ${account.user.token}` }

      axios.post(import.meta.env.VITE_API_URL + `/groupposts/post/`, payload, { headers })
        .then(response => {
          console.log(response)
          setAddNewPostHidden(true)
          setErrorMessage('')
          setUpdateListing(!updateListing)
        }).catch(error => {
          setErrorMessage('Something went wrong');
        }).finally(() => {
          
          
        }
        )

    } catch (error) {
      setErrorMessage('Something went wrong');
    }
  }

  return (
    <div>
      <h2>Posts</h2>

      <div id="addpostcontainer">
        <button onClick={() => setAddNewPostHidden(!addNewPostHidden)}>
          {addNewPostHidden ? 'Add New Post' : 'Cancel'}
        </button>
        {!addNewPostHidden && (
          <div>{errorMessage && (
            <div className="auth-error" style={{ color: 'red', marginBottom: '10px' }}>
              {errorMessage}
            </div>)}

            <form id="addpostform" onSubmit={handleSubmit}>
              <textarea
                placeholder="Write your post here..."
                rows="4"
                cols="50"
                name='groupposttext'
                onChange={handleChange}
              />

              <br />
              <button type="none">Add a Movie</button>
              <button type="none">Add a Finnkino Showtime</button>
              <button className='grouppostsubmitbutton' type="submit">Submit Post</button>
            </form>
          </div>
        )}
      </div>
      <GroupPostsListing groupId={groupId} update={updateListing} />

    </div>
  )
}

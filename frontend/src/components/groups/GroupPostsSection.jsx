import React, { useState } from 'react'
import GroupPostsListing from './GroupPostsListing.jsx'
import FinnkinoShowtimeSelector from './FinnkinoShowtimeSelector.jsx'
import './GroupPostsSection.css'
import { useUser } from '../../context/UseUser.js'
import axios from 'axios'

export default function GroupPostsSection({ groupId }) {
  const [addNewPostHidden, setAddNewPostHidden] = useState(true)
  const account = useUser()
  const [updateListing, setUpdateListing] = useState(false)

  const [postText, setPostText] = useState('')
  const [movieId, setMovieId] = useState(null)

  // finnkino post states
  const [originalTitle, setOriginalTitle] = useState('')
  const [showtime, setShowtime] = useState(null)
  const [theatreId, setTheatreId] = useState(null)
  const [theatreName, setTheatreName] = useState('')
  const [posterUrl, setPosterUrl] = useState('')

  const [errorMessage, setErrorMessage] = useState('')

  // finnkino dropdown states
  const [showFinnkinoSection, setShowFinnkinoSection] = useState(false)
  const [finnkinoDetails, setFinnkinoDetails] = useState(null)

  const handleToggleFinnkinoSection = () => {
    setShowFinnkinoSection(!showFinnkinoSection)
  }

  // callback from finnkino component
  const handleShowtimeSelect = (showtimeDetails) => {
    // console.log("finnkino showtime selected:", showtimeDetails)
    setFinnkinoDetails(showtimeDetails)
    setOriginalTitle(showtimeDetails.originalTitle)
    setShowtime(showtimeDetails.showtime)
    setTheatreId(showtimeDetails.theatreId)
    setTheatreName(showtimeDetails.theatre)
    setPosterUrl(showtimeDetails.posterUrl)
    setShowFinnkinoSection(false)
  }

  const handleChange = (e) => {
    setPostText(e.target.value)
    console.log(postText)
  }

  // group post submission handler
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
          finnkino_theatre_name: theatreName,  // theatre name (Plaza, Oulu)
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
          // clear form when submit is done
          setPostText('')
          setMovieId(null)
          setOriginalTitle('')
          setShowtime(null)
          setTheatreId(null)
          setTheatreName('')
          setPosterUrl('')
          setFinnkinoDetails(null)
          
        }
        )

    } catch (error) {
      setErrorMessage('Something went wrong');
    }
  }

  return (
    <div>
      <div id="posts-header">
        <h2>Posts</h2>
        <button onClick={() => setAddNewPostHidden(!addNewPostHidden)}>
          {addNewPostHidden ? 'Add New Post' : 'Cancel'}
        </button>
      </div>

      <div id="addpostcontainer">
        {finnkinoDetails && !addNewPostHidden && (
          // card that shows after finnkino showtime is selected
          <div className="finnkino-selected-details">
            <h4>Selected Finnkino Showtime: </h4>
            <div>
            <p><strong>Movie: </strong> {finnkinoDetails.originalTitle}</p>
            </div>
            <div>
            <p><strong>Theatre: </strong> {finnkinoDetails.theatre} - {finnkinoDetails.auditorium}</p>
            </div>
            <div>
            <p><strong>Date & Time: </strong> {finnkinoDetails.displayDate} at {finnkinoDetails.displayTime}</p>
            </div>
            <button 
              type="button" 
              onClick={() => {
                setFinnkinoDetails(null)
                setOriginalTitle('')
                setShowtime(null)
                setTheatreId(null)
                setTheatreName('')
                setPosterUrl('')
              }}
              className="groupPageButton"
            >
              Clear Selection
            </button>
          </div>
        )}
        
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
              <button type="button">Add a Movie</button>
              <button type="button" onClick={handleToggleFinnkinoSection}>
                {showFinnkinoSection ? 'Hide Finnkino Showtime' : 'Add a Finnkino Showtime'}
              </button>
              <button className='grouppostsubmitbutton' type="submit">Submit Post</button>
            </form>

            <FinnkinoShowtimeSelector
              isVisible={showFinnkinoSection}
              onShowtimeSelect={handleShowtimeSelect}
              onClose={() => setShowFinnkinoSection(false)}
            />
          </div>
        )}
      </div>
      <GroupPostsListing groupId={groupId} update={updateListing} />

    </div>
  )
}

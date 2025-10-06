import React, { useState, useEffect } from 'react'
import { useUser } from '../../../context/UseUser'

export default function ManagePosts({ onClose, groupId }) {
  const { user } = useUser()
  const [errorMessage, setErrorMessage] = useState('')
  const [posts] = useState([])

  useEffect(() => {
    // TODO: Fetch group posts
    const fetchPosts = async () => {
      try {
        // todo make api call to fetch posts for the group
      } catch (error) {
        setErrorMessage('Failed to fetch posts')
      }
    }
    // fetchPosts()
  }, [groupId, user.token])

  const handleDeletePost = async (postId) => {
    try {
      // todo make
    } catch (error) {
      setErrorMessage('Failed to delete post')
    }
  }

  return (
    <div className="signin open">
      <div className="auth-modal">
        <div className="auth-fields">
          <h3>Manage Posts</h3>
          {errorMessage && (
            <div className="auth-error" style={{ color: 'red', marginBottom: '10px' }}>
              {errorMessage}
            </div>
          )}

          <div className="field">
            {posts.length > 0 ? (
              <ul>
                {posts.map(post => (
                  <li key={post.id}>
                    {post.content}
                    <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No posts to display. (Feature pending implementation)</p>
            )}
          </div>
        </div>
        <button type="button" onClick={onClose} className="close-signin-btn" aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" className="close-btn" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

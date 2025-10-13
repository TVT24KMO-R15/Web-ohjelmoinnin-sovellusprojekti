import React, { useState, useEffect } from 'react'
import { useUser } from '../../../context/UseUser'
import ModalWrapper from './ModalWrapper'

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
    <ModalWrapper onClose={onClose} errorMessage={errorMessage}>
      <h3>Manage Posts</h3>
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
    </ModalWrapper>
  )
}

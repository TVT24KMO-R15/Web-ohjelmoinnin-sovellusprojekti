import React, { useState } from 'react'
import { useUser } from '../../../context/UseUser'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function DeleteGroup({ onClose, groupId }) {
  const { user } = useUser()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const [confirmText, setConfirmText] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (confirmText !== 'DELETE') {
      setErrorMessage('Please type DELETE to confirm')
      return
    }

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/groups/${groupId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      )

      if (response.status === 200) {
        alert('Group deleted successfully')
        navigate('/groups')
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error.message || 'Failed to delete group')
      } else {
        setErrorMessage('Failed to delete group')
      }
    }
  }

  return (
    // NOTE THIS IS CRINGE TURN THIS INTO AN ACTUAL COMPONENT LATER
    <div className="signin open">
      <form className="auth-modal" onSubmit={handleSubmit}>
        <div className="auth-fields">
          {errorMessage && (
            <div className="auth-error" style={{ color: 'red', marginBottom: '10px' }}>
              {errorMessage}
            </div>
          )}

          <div className="field">
            <p>Are you sure you want to delete this group? This action cannot be undone.</p>
            <p>Type DELETE to confirm:</p>
            <input
              type="text"
              name="confirmText"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="DELETE"
            />
          </div>
        </div>
        <button className="auth-submit" type="submit">
          Delete Group
        </button>
        <button type="button" onClick={onClose} className="close-signin-btn" aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" className="close-btn" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </button>
      </form>
    </div>
  )
}

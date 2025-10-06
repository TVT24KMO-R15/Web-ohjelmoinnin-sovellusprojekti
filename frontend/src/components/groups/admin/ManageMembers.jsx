import React, { useState, useEffect } from 'react'
import { useUser } from '../../../context/UseUser'

export default function ManageMembers({ onClose, groupId }) {
  const { user } = useUser()
  const [errorMessage, setErrorMessage] = useState('')
  const [members] = useState([])

  useEffect(() => {
    // TODO: Fetch group members
    const fetchMembers = async () => {
      try {
      } catch (error) {
        setErrorMessage('Failed to fetch members')
      }
    }
    // fetchMembers()
  }, [groupId, user.token])

  const handleRemoveMember = async (memberId) => {
    try {
    } catch (error) {
      setErrorMessage('Failed to remove member')
    }
  }


  
  return (
    <div className="signin open">
      <div className="auth-modal">
        <div className="auth-fields">
          <h3>Manage Members</h3>
          {errorMessage && (
            <div className="auth-error" style={{ color: 'red', marginBottom: '10px' }}>
              {errorMessage}
            </div>
          )}

          <div className="field">
            {members.length > 0 ? (
              <ul>
                {members.map(member => (
                  <li key={member.id}>
                    {member.username}
                    <button onClick={() => handleRemoveMember(member.id)}>Remove</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No members to display. (Feature pending implementation)</p>
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

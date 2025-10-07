import React, { useState, useEffect } from 'react'
import { useUser } from '../../../context/UseUser'
import ModalWrapper from './ModalWrapper'

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
    <ModalWrapper onClose={onClose} errorMessage={errorMessage}>
      <h3>Manage Members</h3>
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
    </ModalWrapper>
  )
}

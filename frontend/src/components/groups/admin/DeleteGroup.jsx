import React, { useState } from 'react'
import { useUser } from '../../../context/UseUser'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ModalWrapper from './ModalWrapper'

export default function DeleteGroup({ onClose, groupId }) {
  const { user } = useUser()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const [confirmText, setConfirmText] = useState('')

  const handleSubmit = async () => {
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
    <ModalWrapper 
      onClose={onClose} 
      onSubmit={handleSubmit} 
      errorMessage={errorMessage}
      submitButtonText="Delete Group"
    >
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
    </ModalWrapper>
  )
}

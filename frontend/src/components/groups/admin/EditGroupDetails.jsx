import React, { useState } from 'react'
import { useUser } from '../../../context/UseUser'
import axios from 'axios'

export default function EditGroupDetails({ onClose, groupId, currentDetails }) {
  const { user } = useUser()
  const [errorMessage, setErrorMessage] = useState('')
  const [groupData, setGroupData] = useState({
    groupname: currentDetails.groupname || '',
    groupdescription: currentDetails.groupdescription || ''
  })

  const handleChange = (e) => {
    setGroupData({ ...groupData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!groupData.groupname || !groupData.groupdescription) {
      setErrorMessage('All fields are required')
      return
    }

    const payload = { groups: {
      groupname: groupData.groupname,
      groupdescription: groupData.groupdescription
    }}

    const config = { headers: {
      Authorization: `Bearer ${user.token}`
    }}

    axios.put(`${import.meta.env.VITE_API_URL}/groups/update/${groupId}`, payload, config)
    .then((response) => {
      if (response.status === 200) {
        alert('Group details updated successfully')
        window.location.reload()
}
    })
    .catch((error) => {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error.message || 'Failed to update group')
      } else {
        setErrorMessage('Failed to update group')
      }
    })
  }

  return (
    <div className="signin open">
      <form className="auth-modal" onSubmit={handleSubmit}>
        <div className="auth-fields">
          {errorMessage && (
            <div className="auth-error" style={{ color: 'red', marginBottom: '10px' }}>
              {errorMessage}
            </div>
          )}

          <div className="field">
            <p>Group Name:</p>
            <input
              type="text"
              name="groupname"
              value={groupData.groupname}
              onChange={handleChange}
              placeholder="Group Name"
            />
          </div>
          <div className="field">
            <p>Group Description:</p>
            <textarea
              name="groupdescription"
              value={groupData.groupdescription}
              onChange={handleChange}
              placeholder="Group Description"
              rows="4"
            />
          </div>
        </div>
        <button className="auth-submit" type="submit">
          Update Group
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


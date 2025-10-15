import React, { useState } from 'react'
import { useUser } from '../../../context/UseUser'
import axios from 'axios'
import ModalWrapper from './ModalWrapper'

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

  const handleSubmit = () => {
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
    },
    withCredentials: true
  }

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
    <ModalWrapper 
      onClose={onClose} 
      onSubmit={handleSubmit} 
      errorMessage={errorMessage}
      submitButtonText="Update Group"
    >
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
    </ModalWrapper>
  )
}


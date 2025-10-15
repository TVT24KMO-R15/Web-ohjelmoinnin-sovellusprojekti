import React, { useState, useEffect } from 'react'
import { useUser } from '../../../context/UseUser'
import ModalWrapper from './ModalWrapper'
import axios from 'axios'
import './ManageMembers.css';

export default function ManageMembers({ onClose, groupId }) {
  const { user } = useUser()
  const [errorMessage, setErrorMessage] = useState('')
  const [members, setMembers] = useState([])

  useEffect(() => {
    const fetchMembers = async () => {
      try { 
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/usergrouplinker/groupid/${groupId}`, {
          withCredentials: true
        })

        // yeet out the group owner from the members list
        const filteredMembers = response.data.filter(member => member.fk_accountid !== user.id)
        setMembers(filteredMembers)
      } catch (error) {
        setErrorMessage('Failed to fetch members: ' + error.message)
        console.error('Error fetching members:', error)
      }
    }
    
    if (groupId) {
      fetchMembers()
    }
  }, [groupId, user.id])

  const handleRemoveMember = async (accountId, username) => {
    if (!confirm(`Are you sure you want to remove ${username} from this group?`)) {
      return
    }
    try {
      // remove from linker table
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/usergrouplinker/delete/accountid/${accountId}/groupid/${groupId}`,
        {
          headers: {
            'Authorization': `Bearer ${user.token}`
          },
          withCredentials: true
        }
      )

      // remove accepted join request when removing
      await axios.post(
        `${import.meta.env.VITE_API_URL}/groupjoin/pendingrequests/removeaccepted/${accountId}/${groupId}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${user.token}`
          },
          withCredentials: true
        }
      )

      // remove from local state
      setMembers(members.filter(member => member.fk_accountid !== accountId))
      setErrorMessage('')
    } catch (error) {
      setErrorMessage('failed to remove member: ' + error.message)
      console.error('error removing member:', error)
    }
  }

  return (
    <ModalWrapper onClose={onClose} errorMessage={errorMessage}>
      <h3>Manage Members</h3>
      <div className="field">
        {members.length > 0 ? (
          <ul className="manage-members-list">
            {members.map(member => (
              <li key={member.fk_accountid} className="manage-members-list-item">
                <span>{member.username}</span>
                <button class="adminControlButton" onClick={() => handleRemoveMember(member.fk_accountid, member.username)}>
                  Remove from group
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No members to display.</p>
        )}
      </div>
    </ModalWrapper>
  )
}

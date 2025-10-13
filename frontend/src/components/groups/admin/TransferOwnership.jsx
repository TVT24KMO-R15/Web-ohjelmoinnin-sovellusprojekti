import React, { useState, useEffect } from 'react'
import { useUser } from '../../../context/UseUser'
import ModalWrapper from './ModalWrapper'
import axios from 'axios'
import './TransferOwnership.css'

export default function TransferOwnership({ onClose, groupId }) {
  const { user } = useUser()
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [members, setMembers] = useState([])
  const [selectedMember, setSelectedMember] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        // get group members
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/usergrouplinker/groupid/${groupId}`)

        // get rid of owner in list
        const filteredMembers = response.data.filter(member => member.fk_accountid !== user.id)
        setMembers(filteredMembers)
        setLoading(false)
      } catch (error) {
        setErrorMessage('Failed to fetch members: ' + error.message)
        console.error('Error fetching members:', error)
        setLoading(false)
      }
    }

    if (groupId) { fetchMembers() }
  }, [groupId, user.id])

  const handleTransferOwnership = async () => {
    if (!selectedMember) {
      setErrorMessage('Please select a member to transfer ownership to')
      return
    }

    // confirm action
    const selectedMemberData = members.find(m => m.fk_accountid === parseInt(selectedMember))
    if (!confirm(`Are you sure you want to transfer ownership to ${selectedMemberData?.username}? This action cannot be undone and you will lose admin privileges.`)) { return }

    try {
      setErrorMessage('')
      setSuccessMessage('')

      await axios.put(
        `${import.meta.env.VITE_API_URL}/groups/transfer/${groupId}`,
        { newOwnerId: parseInt(selectedMember) },
        {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        }
      )

      setSuccessMessage(`Ownership successfully transferred to ${selectedMemberData?.username}. The page will reload shortly.`)
      
      // reload after 2 sec
      setTimeout(() => {window.location.reload()}, 2000)
    } catch (error) {
      setErrorMessage('Failed to transfer ownership: ' + (error.response?.data?.error || error.message))
      console.error('Error transferring ownership:', error)
    }
  }

  return (
    <ModalWrapper onClose={onClose} errorMessage={errorMessage}>
      <h3>Transfer Ownership</h3>
      {successMessage ? (
        <div className="transfer-ownership-success">
          {successMessage}
        </div>
      ) : (
        <>
          <div className="field">
            <p className="transfer-ownership-warning">
              !!Warning!!: Transferring ownership will make the selected member 
              the new group owner. You will lose all admin privileges and cannot undo this action.
            </p>
            
            {loading ? (
              <p>Loading members...</p>
            ) : members.length > 0 ? (
              <>
                <label htmlFor="member-select" className="transfer-ownership-label">
                  Select new owner:
                </label>
                <select
                  id="member-select"
                  value={selectedMember}
                  onChange={(e) => setSelectedMember(e.target.value)}
                  className="transfer-ownership-select"
                >
                  <option value="">-- Select a member --</option>
                  {/* list all group members in dropdown options */}
                  {members.map(member => (
                    <option key={member.fk_accountid} value={member.fk_accountid}>
                      {member.username}
                    </option>
                  ))}
                </select>
                
                <button
                  className="adminControlButton transfer-ownership-button"
                  onClick={handleTransferOwnership}
                  disabled={!selectedMember}
                >
                  Transfer Ownership
                </button>
              </>
            ) : (
              <p>No other members in this group. You must have at least one other member to transfer ownership.</p>
            )}
          </div>
        </>
      )}
    </ModalWrapper>
  )
}

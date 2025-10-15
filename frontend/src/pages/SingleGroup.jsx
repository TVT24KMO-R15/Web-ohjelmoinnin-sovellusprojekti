import React, { useState, useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import axios from 'axios'
import ProtectedRoute from '../components/common/ProtectedRoute'
import { useUser } from '../context/UseUser'
import GroupInfoHeader from '../components/groups/GroupInfoHeader.jsx'
import GroupMembersSection from '../components/groups/GroupMembersSection.jsx'
import GroupPostsSection from '../components/groups/GroupPostsSection.jsx'
import GroupAdminSection from '../components/groups/GroupAdminSection.jsx'
import './SingleGroup.css'

export default function Group() {
  const { user } = useUser()
  // user: email id token username
  const { groupId } = useParams()
  const [groupData, setGroupData] = useState({})
  const [isOwner, setIsOwner] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [loading, setLoading] = useState(true)

// get membership status, returns 403 forbidden if not member
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/groups/getmembers/${groupId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      withCredentials: true
    })
      .then(response => {
        if(response.data?.error) {
          setNotFound(true);
          return;
        }
      })
      .catch(error => {
        console.error("Error getting membership status:", error);
        setNotFound(true);
      });
  }, [groupId, user.token])

  // get group info
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/groups/${groupId}`, {
      withCredentials: true
    })
      .then(response => {
        const data = response.data;
        console.log("group data:", data)
        if (data?.error?.status === 404) {
          console.log("Group not found")
          setGroupData({})
          setNotFound(true)
          return
        }
        setGroupData(data)
      })
      .catch(error => console.error('Error fetching group data:', error))
  }, [groupId])

  // check if user is owner
  useEffect(() => {
    if(notFound) return
    if (user && user.id && user.token) {
      axios.get(`${import.meta.env.VITE_API_URL}/groups/${groupId}/accountid/${user.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        withCredentials: true
      })
        .then(response => {
          const data = response.data;
          console.log("is owner data:", data)
          setIsOwner(data.isOwner)
        })
        .catch(error => console.error('Error fetching owner status:', error))
    }
    setLoading(false)
  }, [user, groupId, notFound])

  // leave group as user
  const handleLeaveGroup = () => {
    const confirmLeave = window.confirm('Are you sure you want to leave this group? This action cannot be undone.')
    if (!confirmLeave) {
      return
    }

    axios.post(`${import.meta.env.VITE_API_URL}/groups/leave/${groupId}`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      withCredentials: true
    })
    .then(response => {
      if (response.status === 200) {
        setNotFound(true)
      } else {
        console.error('Failed to leave group')
      }
    })
    .catch(error => console.error('Error leaving group:', error))
  }



  return (
    <>
      <ProtectedRoute />
      {loading && <div>Loading...</div>}
      {notFound && <Navigate to="/" replace />} {/* notfound or home here? */}
      <div className='singlegrouppage'>
        <div className='groupcontentdiv'>

          {isOwner && (
            <div className='groupcontent'>
              <GroupAdminSection groupId={groupId} groupData={groupData} />
            </div>
          )}
          
          <div className='groupcontent'>
            <GroupPostsSection groupId={groupId} isOwner={isOwner} />
          </div>

          
        </div>

        <div className='groupinfodiv'>
          <div className='groupcontent'>
            <GroupInfoHeader groupData={groupData} />
            {!isOwner && (
              <button className='adminControlButton' onClick={handleLeaveGroup}>Leave group</button>
            )}
          </div>

          <div className='groupcontent'>
            <GroupMembersSection groupId={groupId} />
          </div>
        </div>
      </div>
    </>
  )
}

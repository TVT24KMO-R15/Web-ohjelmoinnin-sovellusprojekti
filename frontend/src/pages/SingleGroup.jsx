import React, { useState, useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
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

  // get group info
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/groups/${groupId}`)
      .then(response => {
        return response.json()
      })
      .then(data =>  {
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
      fetch(`${import.meta.env.VITE_API_URL}/groups/${groupId}/accountid/${user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log("is owner data:", data)
          setIsOwner(data.isOwner)
        })
        .catch(error => console.error('Error fetching owner status:', error))
    }
  }, [user, groupId])

  // get membership status, returns 403 forbidden if not member
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/groups/getmembers/${groupId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if(data?.error) {
          setNotFound(true);
          return;
        }
        console.log("Group members:", data);
      })
      .catch(error => {
        console.error("Error fetching group members:", error);
      });
  }, [groupId])


  return (
    <>
      <ProtectedRoute />
      {notFound && <Navigate to="/notfound" replace />}
      <div className='singlegrouppage'>
        <div className='groupcontentdiv'>
          <div className='groupcontent'>
            <GroupPostsSection groupId={groupId} />
          </div>

          {isOwner && (
            <div className='groupcontent'>
              <GroupAdminSection groupId={groupId} groupData={groupData} />
            </div>
          )}
        </div>

        <div className='groupinfodiv'>
          <div className='groupcontent'>
            <GroupInfoHeader groupData={groupData} />
          </div>

          <div className='groupcontent'>
            <GroupMembersSection groupId={groupId} />
          </div>
        </div>
      </div>
    </>
  )
}

import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import AdminPanel from '../components/groups/admin/AdminPanel.jsx'
import ProtectedRoute from '../components/common/ProtectedRoute'
import { useUser } from '../context/UseUser'
import GroupMemberList from '../components/groups/GroupMemberList.jsx'
import GroupPostsListing from '../components/groups/GroupPostsListing.jsx'
import './SingleGroup.css'

export default function Group() {
  const { user } = useUser()
  // user: email id token username
  const { groupId } = useParams()
  const [groupData, setGroupData] = useState({})
  const [addNewPostHidden, setAddNewPostHidden] = useState(true)
  const [isOwner, setIsOwner] = useState(false)
  const [adminPanelOpen, setAdminPanelOpen] = useState(false)

  // get group info
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/groups/${groupId}`)
      .then(response => {
        return response.json()
      })
      .then(data =>  {
        console.log("group data:", data)
        setGroupData(data)
      })
      .catch(error => console.error('Error fetching group data:', error))
  }, [groupId])

  // check if user is owner
  useEffect(() => {
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

  return (
    <>
      <div><ProtectedRoute /></div>

      <div id="singlegrouppage">
        <h1>Group {groupData.groupname}</h1>
        <p>{groupData.groupdescription}</p>
        <div><p>Created on: {new Date(groupData.creation_date).toLocaleDateString('en-GB')}</p></div>
        <div id="memberscontainer">
          <h2>Members:</h2>
          <ul>
            <GroupMemberList groupId={groupId} />
          </ul>
        </div>
        <div id="postscontainer">
          <h2>Posts:</h2>
          <ul>
            <GroupPostsListing groupId={groupId} />
          </ul>
        </div>
        <div id="addpostcontainer">
          <button onClick={() => setAddNewPostHidden(!addNewPostHidden)}>{addNewPostHidden ? 'Add New Post' : 'Cancel'}</button>
          {!addNewPostHidden && (
            <form id="addpostform">
              <textarea placeholder="Write your post here..." rows="4" cols="50"></textarea>
              <br />
              <button type="submit">Submit Post</button>
            </form>
          )}
      </div>
        {isOwner && (
          <div id="groupadmincontainer">
            <h2>Group Administration</h2>
            <div className='adminbuttoncontainer'>
              <button className='deletebutton' onClick={() => setAdminPanelOpen(!adminPanelOpen)}>
                {adminPanelOpen ? 'Close Admin Panel' : 'Open Admin Panel'}
              </button>
            </div>
            {adminPanelOpen && (
              <AdminPanel 
                onClose={() => setAdminPanelOpen(false)}
                groupId={groupId} 
                groupData={groupData} 
              />
            )}
          </div>
        )}
      </div>
    </>
  )
}

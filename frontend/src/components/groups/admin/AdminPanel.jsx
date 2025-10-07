import React, { useState } from 'react'
import DeleteGroup from './DeleteGroup'
import EditGroupDetails from './EditGroupDetails.jsx'
import ManageGroupMembers from './ManageMembers'
import ManageGroupPosts from './ManagePosts'
import ManageGroupApplications from './ManageApplications.jsx'
import './AdminPanel.css'

// things that only group owners can see
export default function AdminPanel({ groupId, groupData }) {
  const [editGroupDetailsOpen, setEditGroupDetailsOpen] = useState(false)
  const [manageMembersOpen, setManageMembersOpen] = useState(false)
  const [deleteGroupOpen, setDeleteGroupOpen] = useState(false)
  const [managePostsOpen, setManagePostsOpen] = useState(false)
  const [manageApplicationsOpen, setManageApplicationsOpen] = useState(false)

  return (
    <div id="admin-panel">
      <h2>Admin Panel</h2>
      <div className='adminbuttons'>
        <button className='adminControlButton' onClick={() => setEditGroupDetailsOpen(true)}>
          Edit Group Details
        </button>
        <button className='adminControlButton' onClick={() => setManageApplicationsOpen(true)}>
          Manage Applications
        </button>
        <button className='adminControlButton' onClick={() => setManageMembersOpen(true)}>
          Manage Members
        </button>
        <button className='adminControlButton' onClick={() => setManagePostsOpen(true)}>
          Manage Posts
        </button>
        <button className='adminControlButton' onClick={() => setDeleteGroupOpen(true)}>
          Delete Group
        </button>
      </div>

      {editGroupDetailsOpen && (
        <EditGroupDetails
          onClose={() => setEditGroupDetailsOpen(false)}
          groupId={groupId}
          currentDetails={groupData}
        />
      )}

      {manageApplicationsOpen && (
        <ManageGroupApplications
          onClose={() => setManageApplicationsOpen(false)}
          groupId={groupId}
        />
      )}

      {manageMembersOpen && (
        <ManageGroupMembers
          onClose={() => setManageMembersOpen(false)}
          groupId={groupId}
        />
      )}

      {managePostsOpen && (
        <ManageGroupPosts
          onClose={() => setManagePostsOpen(false)}
          groupId={groupId}
        />
      )}

      {deleteGroupOpen && (
        <DeleteGroup
          onClose={() => setDeleteGroupOpen(false)}
          groupId={groupId}
        />
      )}
    </div>
  )
}

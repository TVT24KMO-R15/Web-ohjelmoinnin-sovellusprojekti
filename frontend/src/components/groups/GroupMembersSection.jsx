import React from 'react'
import GroupMemberList from './GroupMemberList.jsx'
import './GroupMembersSection.css'

export default function GroupMembersSection({ groupId }) {
  return (
    <div>
      <h2>Members</h2>
      <GroupMemberList groupId={groupId} />
    </div>
  )
}

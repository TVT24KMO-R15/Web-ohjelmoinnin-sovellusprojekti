import React from 'react'
import './GroupInfoHeader.css'

export default function GroupInfoHeader({ groupData }) {
  return (
    <div>
      <h2>{groupData.groupname}</h2>
      <div className='groupinfolist'>
        <div>
          <label>Description: </label>
          <p>{groupData.groupdescription}</p>
        </div>
        <div>
          <label>Created: </label>
          <p>{groupData.creation_date ? new Date(groupData.creation_date).toLocaleDateString('en-GB') : 'N/A'}</p>
        </div>
      </div>
    </div>
  )
}

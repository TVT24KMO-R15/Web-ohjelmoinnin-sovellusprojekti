import React, { useState } from 'react'
import AdminPanel from './admin/AdminPanel.jsx'
import './GroupAdminSection.css'

export default function GroupAdminSection({ groupId, groupData }) {
  const [adminPanelOpen, setAdminPanelOpen] = useState(false)

  return (
    <div>
      <h2>Group Administration</h2>
      <div className='adminbuttoncontainer'>
        <button className='adminControlButton' onClick={() => setAdminPanelOpen(!adminPanelOpen)}>
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
  )
}

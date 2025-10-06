import React from 'react'

export default function ManageApplications({ onClose, groupId }) {
  return (
    <div className="signin open">
      <div className="auth-modal">
        <div className="auth-fields">
          <h3>Manage Applications</h3>
          <div className="field">
            <p>see all group join applications here</p>
          </div>
        </div>
        <button type="button" onClick={onClose} className="close-signin-btn" aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" className="close-btn" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

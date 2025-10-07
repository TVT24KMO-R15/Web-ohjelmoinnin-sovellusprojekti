import React from 'react'
import ModalWrapper from './ModalWrapper'

export default function ManageApplications({ onClose, groupId }) {
  return (
    <ModalWrapper onClose={onClose}>
      <h3>Manage Applications</h3>
      <div className="field">
        <p>see all group join applications here</p>
      </div>
    </ModalWrapper>
  )
}

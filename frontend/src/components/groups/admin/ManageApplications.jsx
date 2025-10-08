import { React, useState, useEffect } from 'react'
import axios from 'axios'
import ModalWrapper from './ModalWrapper'
import AccountEmailById from '../../common/AccountEmailById'
import ManageApplicationsRow from './ManageApplicationsRow'

export default function ManageApplications({ onClose, groupId }) {
  const [loading, setLoading] = useState(true)
  const [requests, setRequests] = useState(null)



  useEffect(() => {
    const address = import.meta.env.VITE_API_URL + `/groupjoin/requests/${groupId}`
    axios.get(address)
      .then(response => {
        console.log(response.data)
        setRequests(response.data.filter(item => (item.status.includes('pending'))))
      }).catch(error => {
        console.log(error)
        if (error.status == 404) {
          setRequests([])
        }
      }).finally(() => {
        setLoading(false)
      })


  }, [])





  if (loading) return (<div>Loading...</div>)

  return (
    <ModalWrapper onClose={onClose}>
      <h3>Manage Applications</h3>
      <div className="field">
        {(requests.length === 0) ? <><p>No Unanswered Applications.</p></>
          :
          <>
            {requests.map(item => (
              <ManageApplicationsRow request={item}/>
            ))}
          </>}
      </div>
    </ModalWrapper>
  )
}

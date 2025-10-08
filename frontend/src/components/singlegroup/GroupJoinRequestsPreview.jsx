import { React, useState, useEffect } from 'react'
import axios from 'axios'
import GroupJoinRequests from './GroupJoinRequests'

export default function GroupJoinRequestsPreview(group) {
    const [loading, setLoading] = useState(true)
    const [requests, setRequests] = useState(null)
    const [requestsOpen, setRequestsOpen] = useState(false)
    const [reloadState, setReloadState] = useState(false)

    useEffect(()=> {
        const address = import.meta.env.VITE_API_URL + `/groupjoin/requests/${group.groupid}`
        axios.get(address)
        .then(response => {
            console.log(response.data)
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })
        
        
    }, [reloadState])

    if (loading) return (<div>Loading...</div>)

    if (!loading) {
        return (
            <div className='accountcontent'>
                <h2>Join Requests</h2>
                {(requests) ? (<div>No Pending Requests</div>): <div><button onClick={() => setRequestsOpen(true)}>Answer Requests</button></div>}
                
                requestsOpen && <GroupJoinRequests onClose={() => {setRequestsOpen(false); setReloadState(!reloadState)}} requestList = {requests}/>
            </div>
        )
    }
}

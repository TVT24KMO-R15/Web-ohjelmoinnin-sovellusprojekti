import {React, useState, useEffect } from 'react'
import { useUser } from '../../context/UseUser'
import { Link } from 'react-router-dom'


export default function GoToGroupPageButton(groupid) {
    const [accessGranted, setAccessGranted] = useState(false)
    const [accessRequestPending, setAccessRequestPending] = useState(true)

    const account = useUser();

    const sendRequest = () => {
        console.log(`sending request to join group ${groupid.groupid}`)
    }

    const cancelRequest = () => {
        console.log(`canceling request to join group ${groupid.groupid}`)
    }

    useEffect(() =>{
        
    }, [])

    return (
        <div>
            {(accessGranted && account.user.id) && <div className='deletebutton'><Link className='gotogrouplink' to={`/groups/${groupid.groupid}`}>Go to Group Page</Link></div>}
            {(!accessGranted && accessRequestPending && account.user.id)  && <><p className='requeststatusmessage'>Join request pending</p><button className='deletebutton' onClick={cancelRequest}>Cancel Request</button></>}
            {(!accessGranted && !accessRequestPending && account.user.id) && <><p className='requeststatusmessage'>Want to join?</p><button className='deletebutton' onClick={sendRequest}>Send Request</button></>}
        </div>
    )
}

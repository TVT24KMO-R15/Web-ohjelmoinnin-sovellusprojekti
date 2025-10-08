import { React, useState, useEffect } from 'react'
import axios from 'axios';
import AccountEmailById from '../../common/AccountEmailById';

export default function ManageApplicationsRow(request) {
    const [answered, setAnswered] = useState(false);
    const [accepted, setAccepted] = useState(false);

    const handleAccept = (requestId) => {
        const address = import.meta.env.VITE_API_URL + `/groupjoin/pendingrequests/accept/${requestId}`
        axios.post(address)
            .then(response => {
                console.log(response.data)
                if (response.status === 200) {
                    setAnswered(true)
                    setAccepted(true)
                }
            }).catch(error => {
                alert(error)
            })
    }

    const handleDenial = (requestId) => {
        if (confirm("Confirm Denial:") == true) {
            const address = import.meta.env.VITE_API_URL + `/groupjoin/pendingrequests/reject/${requestId}`
            axios.post(address)
                .then(response => {
                    console.log(response.data)
                    if (response.status === 200) {
                        setAnswered(true)
                        setAccepted(false)
                    }
                }).catch(error => {
                    alert(error)
                })
        }
    }

    return (
        <div className='applicationrow'>
            <AccountEmailById property={request.request.fk_accountid} />
            {(answered) ?
                (accepted) ? <><p>Accepted</p></> : <><p>Denied</p></>
                :
                <>
                    <button onClick={() => { handleAccept(request.request.request_id) }} className='deletebutton'>Accept</button>
                    <button onClick={() => { handleDenial(request.request.request_id) }} className='deletebutton'>Deny</button>
                </>
            }
        </div>
    )
}

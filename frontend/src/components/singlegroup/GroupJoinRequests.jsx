import { React, useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UseUser';
import axios from 'axios';
import AccountEmailById from '../common/AccountEmailById';

export default function GroupJoinRequests({ onClose, requestList }) {
    const [requests, setRequests] = useState(requestList)
    const [errorMessage, setErrorMessage] = useState('');
    const [answered, setAnswered] = useState(false);
    const [accepted, setAccepted] = useState(false)

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


    return (
        <div className="signin open">
            <form className="auth-modal" onSubmit={handleSubmit}>
                <div className="auth-fields">
                    {errorMessage && (
                        <div className="auth-error" style={{ color: 'red', marginBottom: '10px' }}>
                            {errorMessage}
                        </div>)}

                    <p>Pending Requests:</p>
                    {requests.map(item => {
                        <>
                            <AccountEmailById property={item.accountid} />
                            {(answered) ?
                                 (accepted) ? <><div>Accepted!</div></> : <>Denied</> 
                            :
                            <>
                                <button onClick={handleAccept(item.requestid)} className='deletebutton'>Accept</button>
                                <button onClick={handleDenial(item.requestid)} className='deletebutton'>Deny</button>
                            </>
                            }

                        </>
                    })}

                </div>

                <button type="button" onClick={onClose} className="close-signin-btn" aria-label="Close">
                    <svg xmlns="http://www.w3.org/2000/svg" className="close-btn" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000">
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                    </svg>
                </button>
            </form>
        </div>
    )
}

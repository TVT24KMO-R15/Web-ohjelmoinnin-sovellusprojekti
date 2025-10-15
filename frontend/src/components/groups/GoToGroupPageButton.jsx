import { React, useState, useEffect } from 'react'
import { useUser } from '../../context/UseUser'
import { Link } from 'react-router-dom'
import axios from "axios"


export default function GoToGroupPageButton(group) {
    const [accessGranted, setAccessGranted] = useState(false)
    const [accessRequestPending, setAccessRequestPending] = useState(false)
    const [rejected, setRejected] = useState(false)
    const [ownGroup, setOwnGroup] = useState(false)
    const [reload, setReload] = useState(false)

    const account = useUser();

    // note these are cringe in the requests because headers must be in third parameter for auth
    const headers = { Authorization: `Bearer ${account.user.token}` };

    const sendRequest = () => {
        console.log(`sending request to join group ${group.group.groupid}`)
        const address = import.meta.env.VITE_API_URL + `/groupjoin/join/${account.user.id}/${group.group.groupid}`
        console.log(address)
        axios.post(address, {}, { headers, withCredentials: true })
            .then(result => {
                console.log(result)
            }).catch(error => {
                alert(error)
            }).finally(() => {
                setReload(!reload)
            })

    }


    const cancelRequest = () => {
        console.log(`canceling request to join group ${group.group.groupid}`)
        const address = import.meta.env.VITE_API_URL + `/groupjoin/pendingrequests/remove/${account.user.id}/${group.group.groupid}`
        console.log(address)
        axios.post(address, {}, { headers, withCredentials: true })
            .then(result => {
                console.log(result)
            }).catch(error => {
                alert(error)
            }).finally(() => {
                setReload(!reload)
            })
    }

    const tryAgain = () => {
        console.log(`removing earlier request to join group ${group.group.groupid}`)
        const address = import.meta.env.VITE_API_URL + `/groupjoin/pendingrequests/removerejected/${account.user.id}/${group.group.groupid}`
        console.log(address)
        axios.post(address, {}, { headers, withCredentials: true })
            .then(result => {
                console.log(result)
            }).catch(error => {
                alert(error)
            }).finally(() => {
                sendRequest();
            })


    }

    useEffect(() => {
        if (!account.user.id) {
            console.log('no signup')
            return
        }
        if (group.group.fk_ownerid == account.user.id) {
            setOwnGroup(true)
            return
        }
        const address = import.meta.env.VITE_API_URL + `/groupjoin/requeststatus/${group.group.groupid}/${account.user.id}`
        //console.log(address)
        axios.get(address, { headers, withCredentials: true })
            .then(result => {
                console.log(result.data.result)
                if (result.data.result.includes('No join request found')) {
                    setAccessGranted(false)
                    setAccessRequestPending(false)
                    setRejected(false)
                    return
                }
                const tulos = result.data.result[0]
                console.log(tulos.status)
                if (tulos.status === 'pending') {
                    setAccessGranted(false)
                    setAccessRequestPending(true)
                    setRejected(false)
                } else if (tulos.status === 'accepted') {
                    setAccessGranted(true)
                    setAccessRequestPending(false)
                    setRejected(false)
                } else if ( tulos.status === 'canceled') {
                    setAccessGranted(false)
                    setAccessRequestPending(false)
                    setRejected(false)
                } else if (tulos.status === 'rejected'){
                    setAccessGranted(false)
                    setAccessRequestPending(false)
                    setRejected(true)
                }
            })
    }, [reload])

    if (ownGroup) {return (<div>
        <><p className='requeststatusmessage'>Your own group</p><button className='deletebutton'><Link className='gotogrouplink' to={`/groups/${group.group.groupid}`}>Go to Group Page</Link></button></>
    </div>)}

    return (
        <div>
            {(accessGranted && account.user.id) && <><p className='requeststatusmessage'>Join request accepted</p><button className='deletebutton'><Link className='gotogrouplink' to={`/groups/${group.group.groupid}`}>Go to Group Page</Link></button></>}
            {(!accessGranted && accessRequestPending && account.user.id && !rejected) && <><p className='requeststatusmessage'>Join request pending</p><button className='deletebutton' onClick={cancelRequest}>Cancel Request</button></>}
            {(!accessGranted && !accessRequestPending && account.user.id && !rejected) && <><p className='requeststatusmessage'>Want to join?</p><button className='deletebutton' onClick={sendRequest}>Send Request</button></>}
            {(rejected && account.user.id) && <><p className='requeststatusmessage'>Application rejected</p><button className='deletebutton'onClick={tryAgain}>Try Again</button></>}
        </div>
    )
}

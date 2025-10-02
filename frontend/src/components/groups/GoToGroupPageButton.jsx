import { React, useState, useEffect } from 'react'
import { useUser } from '../../context/UseUser'
import { Link } from 'react-router-dom'
import axios from "axios"


export default function GoToGroupPageButton(groupid) {
    const [accessGranted, setAccessGranted] = useState(false)
    const [accessRequestPending, setAccessRequestPending] = useState(false)
    const [reload, setReload] = useState(false)

    const account = useUser();


    const sendRequest = () => {
        console.log(`sending request to join group ${groupid.groupid}`)
        const address = import.meta.env.VITE_API_URL + `/groupjoin/join/${account.user.id}/${groupid.groupid}`
        console.log(address)
        axios.post(address)
            .then(result => {
                console.log(result)
            }).catch(error => {
                alert(error)
            }).finally(() => {
                setReload(!reload)
            })

    }


    const cancelRequest = () => {
        console.log(`canceling request to join group ${groupid.groupid}`)
        const address = import.meta.env.VITE_API_URL + `/groupjoin/pendingrequests/remove/${account.user.id}/${groupid.groupid}`
        console.log(address)
        axios.post(address)
            .then(result => {
                console.log(result)
            }).catch(error => {
                alert(error)
            }).finally(() => {
                setReload(!reload)
            })
    }


    useEffect(() => {
        if (!account.user.id) {
            console.log('no signup')
            return
        }
        const address = import.meta.env.VITE_API_URL + `/groupjoin/requeststatus/${groupid.groupid}/${account.user.id}`
        //console.log(address)
        axios.get(address)
            .then(result => {
                console.log(result.data.result)
                if (result.data.result.includes('No join request found')) {
                    setAccessGranted(false)
                    setAccessRequestPending(false)
                    return
                }
                const tulos = result.data.result[0]
                console.log(tulos.status)
                if (tulos.status === 'pending') {
                    setAccessGranted(false)
                    setAccessRequestPending(true)
                } else if (tulos.status === 'accepted') {
                    setAccessGranted(true)
                    setAccessRequestPending(false)
                } else if (tulos.status === 'rejected' || tulos.status === 'canceled') {
                    setAccessGranted(false)
                    setAccessRequestPending(false)
                }
            })
    }, [reload])

    return (
        <div>
            {(accessGranted && account.user.id) && <div className='deletebutton'><Link className='gotogrouplink' to={`/groups/${groupid.groupid}`}>Go to Group Page</Link></div>}
            {(!accessGranted && accessRequestPending && account.user.id) && <><p className='requeststatusmessage'>Join request pending</p><button className='deletebutton' onClick={cancelRequest}>Cancel Request</button></>}
            {(!accessGranted && !accessRequestPending && account.user.id) && <><p className='requeststatusmessage'>Want to join?</p><button className='deletebutton' onClick={sendRequest}>Send Request</button></>}
        </div>
    )
}

import { React, useState, useEffect } from 'react'
import 'axios'

export default function AccountEmailById(property) {
    const [id, setId] = useState(property)
    const [account, setAccount] = useState([])

    useEffect(() => {
        //setId(property.accountid)
        const address = import.meta.env.VITE_API_URL + `/users/${id.property}`
        //console.log(address)
        fetch(address)
            .then(response => response.json())
            .then(json => {
                //console.log(json)
                setAccount(json)
                //console.log(account)
            }
            )
            .catch(err => {
                console.error('Failed to fetch account', err)

            })

    }, [])

    if (account[0]) {
        //console.log(account)
        return (
            <div>{account[0].email}</div>
        )
    } else {
        return (<div>no email</div>)
    }
}
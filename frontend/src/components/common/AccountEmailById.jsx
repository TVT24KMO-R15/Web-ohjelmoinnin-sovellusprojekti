import { React, useState, useEffect } from 'react'
import 'axios'

export default function AccountEmailById(property) {
    const [id, setId] = useState(property)
    const [account, setAccount] = useState([])

    useEffect(() => {
        //setId(property.accountid)
        if (!id.property) return // bugfix
        
        const address = import.meta.env.VITE_API_URL + `/users/getemail/${id.property}` // get email only instead of all details
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

    if (account.email) {
        //console.log(account)
        return (
            <div>{account.email}</div>
        )
    } else {
        return (<div>no email</div>)
    }
}
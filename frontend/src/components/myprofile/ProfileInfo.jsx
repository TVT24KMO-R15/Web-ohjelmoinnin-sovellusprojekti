import React from 'react'
import './ProfileInfo.css'

import { useUser } from '../../context/UseUser';


export default function ProfileInfo() {
    const account = useUser()
    console.log(account)
    
  return (
    <>
        <h3>{`Profile Info for id ${account.user.id}`}</h3>
    </>
  )
}

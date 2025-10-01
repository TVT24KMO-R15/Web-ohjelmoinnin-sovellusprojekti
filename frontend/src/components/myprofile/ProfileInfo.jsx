import { React, useState, useEffect } from 'react'
import './ProfileInfo.css'
import axios from 'axios';
import ChangePassword from './ChangePassword';
import DeleteUser from './DeleteUser';

import { useUser } from '../../context/UseUser';


export default function ProfileInfo() {
  const account = useUser()
  console.log(account)
  const [accountData, setAccountData] = useState({ username: '', registrationDate: '' })
  const [changePasswordOpen, setChangePasswordOpen] = useState(false)
  const [deleteUserOpen, setDeleteUserOpen] = useState(false)

  useEffect(() => {
    axios.get(import.meta.env.VITE_API_URL + `/users/${account.user.id}`)
      .then(response => {
        console.log(response.data[0])
        setAccountData(response.data[0])
      })
  }, [])

  return (
    <>
      <div>
        <h2>{`Profile Info`}</h2>
        <ul className='profileinfolist'>
          <li>
            <label htmlFor="email">Email: </label>
            <p id='email'>{account.user.email}</p>
          </li>
          <li>
            <label htmlFor="username">Username: </label>
            <p id='username'>{accountData.username}</p>
          </li>
          <li>
            <label htmlFor="registerationdate">Registered: </label>
            <p id='registerationdate'>{accountData.registrationDate.substring(0, 10)}</p>
          </li>
        </ul>
        <button className='deletebutton' onClick={() => setChangePasswordOpen(true)}>Change Password</button>
        <button className='deletebutton' onClick={() => setDeleteUserOpen(true)}>Delete User</button>
        {changePasswordOpen && <ChangePassword 
        onClose={() => setChangePasswordOpen(false)} 
        username={accountData.username}/>}
        
        {deleteUserOpen && <DeleteUser
          onClose={() => setDeleteUserOpen(false)}
          email={account.user.email}
          username={accountData.username}
        />}

      </div>

    </>
  )
}

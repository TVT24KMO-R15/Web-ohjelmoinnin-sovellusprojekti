import { React, useState, useEffect } from 'react'
import GroupSearch from '../components/groups/GroupSearch'
import { useUser } from '../context/UseUser'
import CreateGroup from '../components/groups/CreateGroup'

export default function Groups() {
  const account = useUser()
  const [createGroupOpen, setCreateGroupOpen] = useState(false)


  return (
    <div>
      {(account.user.id) ? <div className='creategroupdiv'><button id='searchBtn' onClick={() => {setCreateGroupOpen(true)}}>Create a New Group</button></div> : <><div className='creategroupdiv'>Log in to Create Groups!</div></>}
      {(createGroupOpen) && <><CreateGroup onClose={() => setCreateGroupOpen(false)} /></>}
      <h1>Groups</h1>
      <GroupSearch />
    </div>

  )
}

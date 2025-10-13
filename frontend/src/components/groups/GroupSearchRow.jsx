import { React, useState }from 'react'
import { useUser } from '../../context/UseUser'
import GoToGroupPageButton from './GoToGroupPageButton';

export default function GroupSearchRow(group) {
  

  const account = useUser();

  return (
    <div className='reviewborder'>
      <h3>{group.group.groupname}</h3>
      <p>{group.group.groupdescription}</p>
      <GoToGroupPageButton group={group.group} key={`k${group.group.groupid}`}/>
    </div>
  )
}

import { React, useState }from 'react'
import { useUser } from '../../context/UseUser'
import GoToGroupPageButton from './GoToGroupPageButton';

export default function GroupSearchRow(group) {
  

  const account = useUser();

  return (
    <div className='reviewborder'>
      <h3>Group Name</h3>
      <p>Group Description</p>
      <GoToGroupPageButton groupid={group.group.reviewid} key={`k${group.group.reviewid}`}/>
      {group.group.reviewid}
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { useUser } from '../../context/UseUser'

export default function GroupMemberList({ groupId }) {
  const { user } = useUser()
  const [members, setMembers] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/groups/getmembers/${groupId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log("Group members:", data);
        setMembers(data);
      })
      .catch(error => {
        console.error("Error fetching group members:", error);
      });
  }, [groupId])

    return (
    <div>
      <ul>
        {members.length > 0 ? (
          members.map((member, index) => (
            <div key={index}>
              <p>{member.username}</p>
            </div>
          ))
        ) : (
          <p>No members found</p>
        )}
      </ul>
    </div>
  )
}

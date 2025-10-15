import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useUser } from '../../context/UseUser'

export default function GroupMemberList({ groupId }) {
  const { user } = useUser()
  const [members, setMembers] = useState([])

  useEffect(() => {
    // changed to use axios for interceptor when token expires
    axios.get(`${import.meta.env.VITE_API_URL}/groups/getmembers/${groupId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      withCredentials: true
    })
      .then(response => {
        console.log("Group members:", response.data);
        setMembers(response.data);
      })
      .catch(error => {
        console.error("Error fetching group members:", error);
      });
  }, [groupId, user.token])

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

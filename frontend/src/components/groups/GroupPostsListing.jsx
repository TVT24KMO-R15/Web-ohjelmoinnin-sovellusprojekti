import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UseUser";
import GroupPost from "./GroupPost";

export default function GroupPostsListing({ groupId, update, isOwner }) {
  const [groupPosts, setGroupPosts] = useState([])
  const account = useUser()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const address = import.meta.env.VITE_API_URL + `/groupposts/groupid/${groupId}`
    const headers = { Authorization: `Bearer ${account.user.token}` }

    axios.get(address, { headers })
      .then(response => {
        console.log(response.data)
        setGroupPosts(response.data)
      }).catch(error => {
        setGroupPosts([])
      }).finally(
        setLoading(false)
      )
  }, [update])

  if (loading) return <div>Thinking...</div>

  if (groupPosts.length == 0) return <div>No Posts... yet!</div>

  return (
    <>
      {groupPosts.map(item => (
        <>
          <GroupPost GroupPost={item} key={item.postid} isOwner={isOwner} />
        </>
      ))}
    </>
  );
}

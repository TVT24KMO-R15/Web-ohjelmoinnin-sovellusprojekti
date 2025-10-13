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

  const handleDeletePost = (postId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?')
    if (!confirmDelete) return

    // pick backend endpoint
    const endpoint = isOwner 
      ? `/groupposts/delete/owner/${postId}`
      : `/groupposts/delete/${postId}`
    
    const address = import.meta.env.VITE_API_URL + endpoint
    const headers = { Authorization: `Bearer ${account.user.token}` }

    axios.delete(address, { headers })
      .then(() => {
        // remove deleted post from state to update UI
        setGroupPosts(prevPosts => prevPosts.filter(post => post.postid !== postId))
      })
      .catch(error => {
        console.error('Failed to delete post:', error)
        alert('Failed to delete post. Please try again.')
      })
  }

  if (loading) return <div>Thinking...</div>

  if (groupPosts.length == 0) return <div>No Posts... yet!</div>

  return (
    <>
      {groupPosts.map(item => (
        <>
          <GroupPost 
            key={item.postid}
            GroupPost={item} 
            isOwner={isOwner}
            currentUserId={account.user.id}
            onDelete={handleDeletePost}
          />
        </>
      ))}
    </>
  );
}

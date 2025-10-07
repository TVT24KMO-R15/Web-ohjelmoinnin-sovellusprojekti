import React, { useState } from 'react'
import GroupPostsListing from './GroupPostsListing.jsx'
import './GroupPostsSection.css'

export default function GroupPostsSection({ groupId }) {
  const [addNewPostHidden, setAddNewPostHidden] = useState(true)

  return (
    <div>
      <h2>Posts</h2>
      <GroupPostsListing groupId={groupId} />
      <div id="addpostcontainer">
        <button onClick={() => setAddNewPostHidden(!addNewPostHidden)}>
          {addNewPostHidden ? 'Add New Post' : 'Cancel'}
        </button>
        {!addNewPostHidden && (
          <form id="addpostform">
            <textarea placeholder="Write your post here..." rows="4" cols="50"></textarea>
            <br />
            <button type="submit">Submit Post</button>
          </form>
        )}
      </div>
    </div>
  )
}

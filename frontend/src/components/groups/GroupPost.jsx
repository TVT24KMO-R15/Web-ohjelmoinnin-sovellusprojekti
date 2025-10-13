import React from "react";
import AccountEmailById from "../common/AccountEmailById";
import PostCommentSection from "./PostCommentSection";

import "./GroupPost.css";

export default function GroupPost({ GroupPost, isOwner, currentUserId, onDelete }) {
  // format finnkino date and time
  const formatFinnkinoDateTime = (showtime) => {
    if (!showtime) return null;
    const date = new Date(showtime);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const finnkinoDateTime = GroupPost.finnkino_showtime
    ? formatFinnkinoDateTime(GroupPost.finnkino_showtime)
    : null;

    const canDelete = isOwner || GroupPost.fk_accountid === currentUserId;

  return (
    <div className="grouppostborder">
      {canDelete && (
        <button 
          className="grouppost-delete-button" 
          onClick={() => onDelete(GroupPost.postid)}>
          Delete post
        </button>
      )}
      <h4>
        <AccountEmailById property={GroupPost.fk_accountid} key={GroupPost.fk_accountid}/>
      </h4>
      <p>{GroupPost.posttext}</p>
      <div>
        {GroupPost.movieid && <>Add details for movie {GroupPost.movieid}</>}

        {GroupPost.finnkino_original_title && (
          <div className="grouppost-finnkino-details">
            <h3>Finnkino Showtime</h3>
            <div className="finnkino-content">
              <div className="finnkino-info">
                <p>
                  <strong>Movie: </strong> {GroupPost.finnkino_original_title}
                </p>
                {GroupPost.finnkino_theatre_name && (
                  <p>
                    <strong>Theatre: </strong> {GroupPost.finnkino_theatre_name}
                  </p>
                )}
                {finnkinoDateTime && (
                  <>
                    <p>
                      <strong>Date: </strong> {finnkinoDateTime.date}
                    </p>
                    <p>
                      <strong>Time: </strong> {finnkinoDateTime.time}
                    </p>
                  </>
                )}
              </div>
              {GroupPost.finnkino_poster_url && (
                <div className="grouppost-poster">
                    <img
                      src={GroupPost.finnkino_poster_url}
                    />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div>
        <p>{GroupPost.postdate.substring(0, 10)}</p>
      </div>

      <PostCommentSection GroupPost={GroupPost} key={GroupPost.postid} isOwner={isOwner}/>
      
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import AccountEmailById from "../common/AccountEmailById";
import PostCommentSection from "./PostCommentSection";
import axios from 'axios';
import "./GroupPost.css";
export default function GroupPost({ GroupPost, isOwner, currentUserId, onDelete }) {
  const movieId = GroupPost.movieid;
  const [movie, setMovie] = useState(null);
  
  // Hae elokuva data
    useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/tmdb/details/${movieId}`);
        setMovie(res.data);
      } catch (err) {
        console.error(err);
        // setError is not defined, so just log the error
      }
    };
    fetchMovie();
  }, [movieId]);

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
        {GroupPost.movieid && movie && (
          <>
          <div className="grouppost-finnkino-details">
            <h3>Movie Post</h3>
            <div className="finnkino-content">
              <div className="finnkino-info">
                <p>
                <strong>Movie: </strong> {movie.original_title}
                </p>
                <p>
                <strong>Runtime: </strong> {movie.runtime} minutes
                </p>
                <p>
                <strong>Genre: </strong> {movie.genres.map(g => g.name).join(', ')}
                </p>
                <p>
                <strong>TMDB user score: </strong> {movie.vote_average}/10 ({movie.vote_count} votes)
                </p>
                <p>
                <strong>Overview: </strong> {movie.overview}
                </p>
          
              </div>
          <div className="grouppost-poster img">
                    <img
                      src={movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : noPoster} // placeholder jos poster puuttuu
                      alt={movie.title}
                      className="poster"
                    />
                  </div>
         </div>   
         </div>
          </>
        )}

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

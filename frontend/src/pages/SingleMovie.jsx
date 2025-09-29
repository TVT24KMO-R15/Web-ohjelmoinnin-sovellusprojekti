import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './SingleMovie.css';
import PostReview from '../components/singlemovie/PostReview';
import ReviewsForMovie from '../components/singlemovie/ReviewsForMovie';

import { useUser } from '../context/UseUser'

export default function SingleMovie({ addToFavourites }) {
  const { movieId } = useParams();
  const { user } = useUser();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [postReviewOpen, setPostReviewOpen] = useState(false)

  const account = useUser()

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/tmdb/details/${movieId}`);
        setMovie(res.data);
      } catch (err) {
        console.error(err);
        setError('Elokuvan tiedot eivät latautuneet.');
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [movieId]);

   // hae käyttäjän suosikit (ei jwt:tä)
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user || !user.email) return;
      try {
       const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/favorites`,
         { params: { email: user.email } } // lähetetään email query
        );
        setFavorites(res.data.favorites);
      } catch (err) {
        console.error("Failed to fetch favorites", err);
      }
    };
  fetchFavorites();
}, [user]);

  const toggleFavorite = async () => {
    if (!user || !user.email) {
      alert('Sign in to add to favorites!');
      return;
    }

    try {
      if (favorites.includes(movie.id)) {
        // poista suosikeista
        await axios.post(
          `${import.meta.env.VITE_API_URL}/favorites/delete`,
          { email: user.email, movieId: movie.id } // pelkkä email ja movieId
        );
        setFavorites((prev) => prev.filter((id) => id !== movie.id));
      } else {
        // lisää suosikkeihin
        await axios.post(
          `${import.meta.env.VITE_API_URL}/favorites/add`,
          { email: user.email, movieId: movie.id } // pelkkä email ja movieId
        );
        setFavorites((prev) => [...prev, movie.id]);
      }
    } catch (err) {
      console.error('Failed to toggle favorite', err);
    }
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!movie) return <div>Movie not found</div>;

  const collectionId = movie.belongs_to_collection?.id;
  if (collectionId) console.log('Collection ID:', collectionId);

  return (
    <>
    <div className="single-movie-container">
      {movie.backdrop_path ? (
        <div
          className="backdrop"
          style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
        />
      ) : (
        <div className="backdrop fallback" />
      )}

      <div className="movie-row">
        <div className="poster-container">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="poster"
          />
        </div>

        <div className="movie-content">
          <div className="header">
            <h1>{movie.original_title}</h1>
              <button onClick={toggleFavorite}> 
                {favorites.includes(movie.id) ? '❤️' : '🤍'} Add to favorites
              </button>
          </div>

          <p className="movie-info">
            <b>Release date:</b> {new Date(movie.release_date).toLocaleDateString('fi-FI')}
          </p>
          <p className="movie-info"><b>Runtime:</b> {movie.runtime} minutes</p>
          <p className="movie-info"><b>Genres:</b> {movie.genres.map(g => g.name).join(', ')}</p>
          <p className="movie-info"><b>TMDB user score:</b> {movie.vote_average}/10 ({movie.vote_count} votes)</p>
          <p className="movie-info"><b>Overview:</b> {movie.overview}</p>
          {collectionId && (
            <p className="movie-info">
              <b>Collection:</b>{" "}
              <Link
                to={`/collection/${collectionId}`}
                className="collection-link"
              >
                {movie.belongs_to_collection.name}
              </Link>
            </p>
          )}
          {user ? ( // väliaikaisesti näyttää userin tiedot tässä
            <p>Logged in as: {user.name} ({user.email})</p>
            ) : (
            <p>No user logged in</p>
          )}
        </div>
        
      </div>
      
    </div>
    { account.user.id ? (<button className='review-button' onClick={() => {setPostReviewOpen(true)}}>Post Your Own Review</button>) : <><p>Log in to post your own review</p></>}
    {postReviewOpen && <PostReview onClose={() => setPostReviewOpen(false)} />}
      <ReviewsForMovie />
    </>
  );
}
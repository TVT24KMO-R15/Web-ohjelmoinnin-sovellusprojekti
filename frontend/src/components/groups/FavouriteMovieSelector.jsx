import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useUser } from '../../context/UseUser';
import './FavouriteMovieSelector.css'

export default function FinnkinoShowtimeSelector({ onMovieSelect, isVisible }) {
    const { user } = useUser();
    const [favourites, setFavourites] = useState([]);
    

  useEffect(() => {
    const fetchFavourites = async () => {
      if (!user || !user.email) return;
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/favorites`, {
          params: { email: user.email },
        });

        const favIds = res.data.favorites || [];

        const lastThreeFavs = favIds.slice(-3).reverse();

        const moviePromises = lastThreeFavs.map(id =>
          axios.get(`${import.meta.env.VITE_API_URL}/api/tmdb/details/${id}`)
        );
        const movieResults = await Promise.all(moviePromises);
        setFavourites(movieResults.map(r => r.data));
      } catch (err) {
        console.error('Failed to fetch favourite movies', err);
      }
    };

    fetchFavourites();
  }, [user]);

   const handleSelectMovie = (movieId) => {
    
    onMovieSelect(movieId) // pass details to parent component
    
  }

   if (!isVisible) return null

  return (
    <div className="favourites-section">
          <div className="favourites-header">
            <h3>Favourites</h3>
          </div>
          <div className="favourites-grid">
            {favourites.length > 0 ? (
              favourites.map((movie) => (
                <div className="movie-info">
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    className="fav-poster"
                  />
                    <p>{movie.title}</p>
                    <div>
                     <button
                  type="button"
                  onClick={() => handleSelectMovie(movie.id)}
                  className="select-movie-btn"
                >
                  Select Movie
                </button>
                 </div>
                 </div> 
              ))
            ) : (
              <p>No favourites yet.</p>
            )}
          </div>
        </div>
  );
}

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../context/UseUser';
import './FavouritesPreview.css';

export default function FavouritesPreview() {
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

  return (
    <div className="favourites-preview">
      <div className="favourites-header">
        <h2>Favourites</h2>
      </div>

      <div className="favourites-grid">
        {favourites.length > 0 ? (
          favourites.map((movie) => (
            <Link key={movie.id} to={`/movies/${movie.id}`} className="poster-link">
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="poster-thumb"
              />
            </Link>
          ))
        ) : (
          <p>No favourites yet.</p>
        )}
      </div>

      <Link to="/myaccount/myfavourites" className="linkseeall">See all</Link>
    </div>
  );
}

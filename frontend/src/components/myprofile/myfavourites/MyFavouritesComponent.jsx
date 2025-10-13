import React, { useEffect, useState } from 'react';
import { useUser } from '../../../context/UseUser';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MyFavourites.css';

export default function MyFavouritesComponent() {
  const { user } = useUser();
  const [favorites, setFavorites] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // kopioitava linkki
  const copyText = `${window.location.origin}/favourites/${user?.id || ''}`;
  const handleCopy = () => {
    navigator.clipboard.writeText(copyText);
    alert(`Copied link: ${copyText}`);
  };

  // hae suosikit
  useEffect(() => {
  const fetchFavorites = async () => {
    if (!user || !user.email) {
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/favorites`, {
        params: { email: user.email },
      });
      setFavorites(res.data.favorites?.slice().reverse() || []);
    } catch (err) {
      console.error('Failed to fetch favorites', err);
      setError('Could not load favorites.');
    } finally {
      setLoading(false);
    }
  };
  fetchFavorites();
}, [user]);

  // hae kaikkien suosikkien tiedot
  useEffect(() => {
    const fetchMovies = async () => {
      if (favorites.length === 0) {
        setLoading(false);
        return;
      }
      try {
        const results = await Promise.all(
          favorites.map(id =>
            axios.get(`${import.meta.env.VITE_API_URL}/api/tmdb/details/${id}`)
          )
        );
        setMovies(results.map(r => r.data));
      } catch (err) {
        console.error('Failed to fetch movie details', err);
        setError('Could not load movie details.');
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [favorites]);

  // toggle
  const toggleFavorite = async (movieId) => {
    if (!user || !user.email) {
      alert('Sign in to manage favorites!');
      return;
    }

    try {
      if (favorites.includes(movieId)) {
        // poista suosikeista
        await axios.post(
          `${import.meta.env.VITE_API_URL}/favorites/delete`,
          { email: user.email, movieId }
        );
        setFavorites(prev => prev.filter(id => id !== movieId));
      } else {
        // lisää suosikkeihin
        await axios.post(
          `${import.meta.env.VITE_API_URL}/favorites/add`,
          { email: user.email, movieId }
        );
        setFavorites(prev => [...prev, movieId]);
      }
    } catch (err) {
      console.error('Failed to toggle favorite', err);
    }
  };


  if (loading) return <div className="fav-status">Loading your favourites...</div>;
  if (!user.email) return <div className="fav-status">Log in to browse favourites!</div>;
  if (error) return <div className="fav-status">{error}</div>;
  if (favorites && favorites.length === 0) return <div className="fav-status">You have no favourites yet.</div>;


  return (
    <div className="myfavourites-container">
      <div className="fav-header">
        <h1>{user.username}'s Favourites</h1>
        <button className="share-button" onClick={handleCopy}>
          🔗 Share Link
        </button>
      </div>

      <div className="fav-grid">
        {movies.map(movie => (
          <div key={movie.id} className="fav-card">
            <div className="fav-heart" onClick={() => toggleFavorite(movie.id)}>
              {favorites.includes(movie.id) ? '❤️' : '🤍'}
            </div>
            <Link to={`/movies/${movie.id}`} className="fav-link">
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="fav-poster"
              />
              <div className="fav-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date?.slice(0, 4)}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

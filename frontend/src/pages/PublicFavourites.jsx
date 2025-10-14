import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./PublicFavourites.css";
import noPoster from '../assets/noPoster.png';

export default function PublicFavourites() {
  const { accountId } = useParams();
  const [favorites, setFavorites] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/favorites/public/${accountId}`);
        setFavorites(res.data.favorites);
      } catch (err) {
        console.error("Failed to fetch public favourites", err);
        setError("Could not load public favourites.");
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [accountId]);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/getid/${accountId}`);
        console.log(res)
        setUsername(res.data[0].username);
      } catch (err) {
        console.error("Failed to fetch username", err);
        setError("Could not load username.");
      }
    };

    fetchUsername();
  }, [accountId]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!favorites || favorites.length === 0) {
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
        console.error("Failed to fetch movie details", err);
        setError("Could not load movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [favorites]);

  if (loading) return <div className="pf-status">Loading public favourites...</div>;
  if (error) return <div className="pf-status">{error}</div>;
  if (!movies || movies.length === 0) return <div className="pf-status">No public favourites yet.</div>;

  return (
    <div className="public-favourites-container">
      <h1>{username}'s favourites</h1>
      <div className="pf-list">
        {movies.map(movie => (
          <div key={movie.id} className="pf-card">
            <Link to={`/movies/${movie.id}`} className="pf-link">
              <img
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : noPoster}
                alt={movie.title}
                className="pf-poster"
              />
              <div className="pf-info">
                <h3 className="pf-title">{movie.title}</h3>
                <p className="pf-year">{movie.release_date?.slice(0, 4)}</p>
                <p className="pf-overview">{movie.overview?.slice(0, 150)}...</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
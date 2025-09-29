import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './MovieCollection.css';

export default function MovieCollection() {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/tmdb/collection/${collectionId}`);
        setCollection(res.data);
      } catch (err) {
        console.error(err);
        setError('Kokoelman tiedot eivät latautuneet.');
      } finally {
        setLoading(false);
      }
    };
    fetchCollection();
  }, [collectionId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!collection) return <div>Collection not found</div>;

  // backdrop ensimmäisestä leffasta
  const backdropMovie = collection.parts.find(m => m.backdrop_path);

  return (
    <div className="collection-container">
      {backdropMovie ? (
        <div
          className="collection-backdrop"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${backdropMovie.backdrop_path})`
          }}
        />
      ) : (
        <div className="collection-backdrop fallback" />
      )}

      <div className="collection-content">
        <h1>{collection.name}</h1>
        <div className="collection-movies">
          {collection.parts.map(movie => (
            <div key={movie.id} className="collection-movie-card">
              <Link to={`/movies/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="collection-poster"
                />
                <p>{movie.title}</p>
              </Link>
            </div>
          ))}
        </div>

        {/* Collectionin kuvaus leffojen jälkeen */}
        {collection.overview && (
            <div className="collection-overview">
                <p>{collection.overview}</p>
            </div>
        )}
      </div>
    </div>
  );
}
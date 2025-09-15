import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

export default function SingleMovie() {
  const { movieId } = useParams()
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/tmdb/details/${movieId}`) // backendin details route
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

  if (loading) return <div>Ladataan...</div>;
  if (error) return <div>{error}</div>;
  if (!movie) return <div>Elokuvaa ei löytynyt</div>;

  return (
  <div style={{ 
  position: 'relative', 
  minHeight: '100vh', 
  padding: '2rem', 
  color: 'white', 
  textShadow: '2px 2px 6px rgba(0,0,0,1)' 
  }}>

  {movie.backdrop_path && (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.5,
        zIndex: 0
      }}
    />
  )}

  <div style={{ display: 'flex', position: 'relative', zIndex: 1 }}>
    <div style={{ flex: '0 0 30%' }}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        style={{
          width: '100%',
          height: 'auto',
          maxHeight: '90vh',
          objectFit: 'contain',
          display: 'block'
        }}
      />
    </div>

    <div style={{ marginLeft: '1rem', flex: '1', display: 'block' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1>{movie.original_title}</h1>
        <button 
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#000000ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          onClick={() => addToFavourites(movie)}
        >
          Add to favourites
        </button>
      </div>

      <p><b>Release date:</b> {movie.release_date}</p>
      <p><b>Runtime:</b> {movie.runtime} minutes</p>
      <p><b>Genres:</b> {movie.genres.map(g => g.name).join(', ')}</p>
      <p><b>TMDB user score:</b> {movie.vote_average} ({movie.vote_count} votes)</p>
      <p><b>Overview:</b> {movie.overview}</p>
      {movie.belongs_to_collection && (
        <div>
          <p><b>Collection:</b> {movie.belongs_to_collection.name}</p>
        </div>
      )}
    </div>
  </div>
</div>

)}
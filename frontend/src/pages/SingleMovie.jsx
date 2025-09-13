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
        const res = await axios.get(`/api/tmdb/details/${movieId}`); // backendin details route
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
  <div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <div style={{ flex: '0 0 50%' }}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>

      <div style={{ marginLeft: '1rem' }}>
        <h1>Elokuva:{movie.title}</h1>
        <p>Julkaisuvuosi: {movie.release_date}</p>
        <p>Arvostelu: {movie.vote_average}</p>
        <p>Kuvaus: {movie.overview}</p>
      </div>
    </div>
  );
}

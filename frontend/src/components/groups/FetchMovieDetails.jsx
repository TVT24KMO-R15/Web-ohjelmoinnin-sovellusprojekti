import { useState, useEffect } from "react";
import axios from "axios";

export function useFetchMovieDetails(movieId) {
    const [movie, setMovie] = useState(null);

    // Fetch movie data
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
  return {movie}
}
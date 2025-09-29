import React from 'react'
import MovieFilters from '../components/search/MovieFilters';
import PopularMovies from '../components/home/PopularMovies';
import './MovieDiscovery.css'
import { useLocation } from 'react-router-dom';

// https://developer.themoviedb.org/reference/discover-movie
export default function MovieDiscovery() {
  const location = useLocation();
  const baseURL = `${import.meta.env.VITE_API_URL}/api/tmdb/discovery/`

  // logging
  /*
  useEffect(() => {
    console.log("urlParameters changed: ", urlParameters)
  }, [urlParameters])
  */

  // from tmdb discovery: sort_by
  // set the key as what gets sent to TMDB, and value as what is shown to user
  const sortingOptions = {
    // 'original_title.asc': 'Original title (A-Z)',
    // 'original_title.desc': 'Original title (Z-A)',
    // 'popularity.asc': 'Popularity (Lowest first)',
    'popularity.desc': 'Popularity (Highest first)',
    // 'revenue.asc': 'Revenue (Lowest first)',
    'revenue.desc': 'Revenue (Highest first)',
    // 'primary_release_date.asc': 'Release date (Oldest first)',
    // 'primary_release_date.desc': 'Release date (Newest first)',
    // 'title.asc': 'Title (A-Z)',
    // 'title.desc': 'Title (Z-A)',
    // 'vote_average.asc': 'Average vote (Lowest first)',
    // 'vote_average.desc': 'Average vote (Highest first)', // removed because a movie with 1 vote and 10 score would be at the top
    // 'vote_count.asc': 'Vote count (Lowest first)',
    'vote_count.desc': 'Vote count (Highest first)'
  }
  //#endregion

  // todo thought popped into my head when choosing a new year or a new filter the page re renders which keeps navigation data maybe remove it when changing parameters etc.

  return (
    <>
      <h1>Discover new movies</h1>
      <MovieFilters 
        type="discovery"
        baseURL={baseURL}
        sortingOptions={sortingOptions}
      />
      <div id='movieDiscoveryResults'>
        {
          (location?.state?.urlParameters)
            ? (console.log("MovieDiscovery: Using URL parameters from location state:", location.state.urlParameters), <PopularMovies reqUrl={location.state.urlParameters} sectionTitle={"Discovery results"} />)
            : (console.log("MovieDiscovery: Using default popular movies URL:", `${import.meta.env.VITE_API_URL}/api/tmdb/popular/`), <PopularMovies reqUrl={`${import.meta.env.VITE_API_URL}/api/tmdb/popular`} sectionTitle={"Movie discovery"} />)
        }
      </div>
    </>
  )
}

import React, { useState, useEffect } from 'react'
import DropDown from '../components/common/DropDown';
import PopularMovies from '../components/home/PopularMovies';
import './MovieDiscovery.css'
import { useNavigate, useLocation } from 'react-router-dom';

// https://developer.themoviedb.org/reference/discover-movie
export default function MovieDiscovery() {
  const navigate = useNavigate();
  const location = useLocation();
  const baseURL = `${import.meta.env.VITE_API_URL}/api/tmdb/discovery/`
  //#region Filtering parameters
  const [selectedTMDBFilter, setSelectedTMDBFilter] = useState() // tmdb filter enum, see sortingoptions
  const [releaseYear, setReleaseYear] = useState()

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


  const handleSelect = (e) => {
    // console.log("Handleselect received value: ", e)
    // match the selected value (e) to the corresponding key in sortingOptions "popularity.desc : Popularity (Highest first)"
    const selectedKey = Object.keys(sortingOptions).find(key => sortingOptions[key] === e);
    // console.log("MovieDiscovery: Setting key: ", selectedKey)
    setSelectedTMDBFilter(selectedKey)
  }

  const makeUrlAndSearch = () => {
    // Build query parameters, filtering out undefined values
    const params = new URLSearchParams()
    if (releaseYear) params.append('primary_release_year', releaseYear)
    if (selectedTMDBFilter) params.append('sort_by', selectedTMDBFilter)
    
    const queryString = params.toString()
    const newUrl = queryString ? `${baseURL}?${queryString}` : baseURL
    console.log("Custom filters url", newUrl)
    // navigate back to this component with the url as state
    navigate("/movies", {state:{urlParameters: newUrl}})
  }

  // todo thought popped into my head when choosing a new year or a new filter the page re renders which keeps navigation data maybe remove it when changing parameters etc.

  return (
    <>
      <h1>Discover new movies</h1>
      <div id='movieDiscoveryFilters'>
        <DropDown
          title={'Sort by'}
          label={'tmdbOptions'}
          items={sortingOptions}
          onSelect={handleSelect}
        />
        <input type="text" className='inputField' placeholder='Release year (optional)' maxLength={4} minLength={4} onChange={(e) => setReleaseYear(e.target.value)}/>
        <button onClick={makeUrlAndSearch} id='searchBtn'>Search with current filters</button>
      </div>
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

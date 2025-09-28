import React from 'react'
import { useLocation } from 'react-router-dom'
import SearchBar from '../components/common/SearchBar';
import PopularMovies from '../components/home/PopularMovies';
import { useState, useEffect } from 'react';

// note to self maybe add recursive props to reuse this as advanced search, props tweaking url parameters (or whatever tmdb uses for advanced search)
// ...from dropdown menus and such
// or maybe make advanced options into its own prop for reuse elsewhere (group search refinement, review search refinement??)
export default function MovieSearch() {
  // when loading /search/ without going through a searchbar the value of e is null and causes errors, this is a workaround
  const locationValue = useLocation();
  const movieName = locationValue.state && locationValue.state.e ? locationValue.state.e : null; // if entering search via url, set moviename to null and then the search doesnt get called
  const [results, setResults] = useState(8)
  const h2Name = movieName ? "Search results" : "" // h2 header text for movies listing

  // if moviename exists (received via useLocation when searching, but not on direct /search load), set url with moviename
  const url = movieName ? `${import.meta.env.VITE_API_URL}/api/tmdb/search/${movieName}` : null 

  // reset search results limit on re-render (going through searchbar again)
  useEffect(() => {
    setResults(8)
  }, [movieName])

  const getMoreResults = () => {
    setResults(prev => prev + 8)
  }

  return (
    <div id='movieSearchContainer'> 
      <h1>Movie search</h1>
      <SearchBar searchDestination={"/search"}/> 
      <div id='dropdownMenus'>
        advanced search options go here
      </div>

      {/* if key changes, component gets re-rendered */}
      <PopularMovies key={`${movieName}-${results}`} reqUrl={url} sectionTitle={h2Name} resultLimit={results}/>
      <button onClick={getMoreResults}>Get more results</button>
    </div>
  )
}

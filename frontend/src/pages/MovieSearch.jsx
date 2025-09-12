import React from 'react'
import { useLocation } from 'react-router-dom'
import SearchBar from '../components/common/SearchBar';
import PopularMovies from '../components/home/PopularMovies';

// note to self maybe add recursive props to reuse this as advanced search, props tweaking url parameters (or what tmdb uses for advanced search)
// ...from dropdown menus and such
export default function MovieSearch() {
  // when loading /search/ without going through a searchbar the value of e is null and causes errors, this is a workaround
  const locationValue = useLocation();
  const movieName = locationValue.state && locationValue.state.e ? locationValue.state.e : ''; // if entering search via url, set moviename to null for useEffect dependency
  
  const resultIncrement = 4 // how many more results with each press of button
  const url = `http://localhost:3000/api/tmdb/search/${movieName}`


  return (
    <div id='movieSearchContainer'> 
      <h1>Movie search</h1>
      <SearchBar searchDestination={"/search"}/> 
      <div id='dropdownMenus'>
        advanced search options go here
      </div>

      <PopularMovies reqUrl={url} sectionTitle={"Search results"}/>
      {/* todo add this latre  */}
      <button>Get more results</button>
    </div>
  )
}

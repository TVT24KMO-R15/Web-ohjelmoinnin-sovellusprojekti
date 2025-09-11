import React from 'react'
import { useLocation } from 'react-router-dom'
import SearchBar from '../components/common/SearchBar';

export default function MovieSearch() {
  // when loading /search/ without going through a searchbar the value of e is null and causes errors, this is a workaround
  const locationValue = useLocation();
  const movieName = locationValue.state && locationValue.state.e ? locationValue.state.e : ""; 

  return (
    <div id='movieSearchContainer'> 
      <h1>Search</h1>
      {/* add another searchbar for use in advanced search later */}
      {/* add reflection to this component?? */}
      <SearchBar searchDestination={"/search"}/> 
      <p>{movieName ? "Results for " + movieName : ""}</p>
      <div id='dropdownMenus'>
        advanced search options go here
      </div>
    </div>
  )
}

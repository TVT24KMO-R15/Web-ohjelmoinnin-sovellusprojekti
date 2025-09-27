import React, { useState } from 'react'
import DropDown from './DropDown'
import SearchBar from '../common/SearchBar'
import ApplyFiltersBtn from './ApplyFiltersBtn'
import './MovieFilters.css'

// bar with dropdowns and inputs to filter movies by year, sort order etc.
export default function MovieFilters({ 
  type = 'discovery', // filter bar type for the discovery page or search page
  baseURL, // base URL for API requests
  sortingOptions, // object of 'key: value' -pairs for dropdown: {popularity.desc: "Most popular", release_date.desc: "Newest"}
  onFilterChange, // callback to parent component when filter changes
  searchDestination = '/search', // default search page route
  movieName = '' // only used in search mode to append to baseURL
}) {
  // console.log("Props received to movieFilters:", {type, baseURL, sortingOptions, onFilterChange, searchDestination, movieName})
  const [releaseYear, setReleaseYear] = useState() // year input by user
  const [selectedTMDBFilter, setSelectedTMDBFilter] = useState() // key from sortingOptions selected by user
  const [open, setOpen] = useState(false) // for toggling filter options in search mode
  const [movieNameState, setMovieNameState] = useState(movieName) // to append to baseURL in search mode

  // event handler for dropdown component selection
  const handleDropdownSelect = (e) => {
    // match the selected value back to the key in sortingOptions
    const selectedKey = Object.keys(sortingOptions).find(key => sortingOptions[key] === e)
    setSelectedTMDBFilter(selectedKey)
    if (onFilterChange) {
      onFilterChange({ selectedTMDBFilter: selectedKey, releaseYear })
    }
  }

  // event handler for year input change
  const handleYearChange = (e) => {
    const year = e.target.value
    setReleaseYear(year)
    if (onFilterChange) {
      onFilterChange({ selectedTMDBFilter, releaseYear: year })
    }
  }

  const toggleFilters = () => setOpen(!open)

  if (type === 'discovery') { // create different HTML output based on type prop
    return (
      <div className='movieFilters'>
        <DropDown
          title={'Sort by'}
          label={'tmdbOptions'}
          items={sortingOptions}
          onSelect={handleDropdownSelect}
        />
        <input 
          type="text" 
          className='inputField' 
          placeholder='Release year (optional)' 
          maxLength={4} 
          minLength={4} 
          onChange={handleYearChange}
        />
        <ApplyFiltersBtn 
          releaseYear={releaseYear}
          selectedTMDBFilter={selectedTMDBFilter}
          baseURL={baseURL}
          navigationDestination="/movies"
        />
      </div>
    )
  }

  // set moviename on change from searchbar
  const onChangeMovieName = (e) => {
    setMovieNameState(e)
    // console.log("MovieFilters: SearchBar onChange value:", e)
  }

  if (type === "search") {
    return (
      <div className='movieFilters'>
        <div id='customSearchBar'>
          <SearchBar searchDestination={searchDestination} defaultValue={movieNameState} onChangeMovieName={onChangeMovieName} /> 
        </div>
        <div id='dropDownHolder'>
          <button onClick={toggleFilters} id='filterToggle'>
            {open ? "Close filters" : "Open filters"}
          </button>
          
          {open && (
            <div id='filterOptions'>
              <input 
                type="text" 
                className='inputField' 
                placeholder='Release year (optional)' 
                maxLength={4} 
                minLength={4} 
                onChange={handleYearChange}
              />
              <ApplyFiltersBtn 
                releaseYear={releaseYear}
                selectedTMDBFilter={null}
                baseURL={`${baseURL}/${movieNameState}`} // append movie name to baseURL in search mode
                navigationDestination={searchDestination}
                movieName={movieNameState} // grab moviename from searchbar and send to button
              />
            </div>
          )}
        </div>
      </div>
    )
  }

  return null
}
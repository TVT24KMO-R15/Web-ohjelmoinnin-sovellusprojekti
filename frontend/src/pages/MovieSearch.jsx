import React, { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import SearchBar from '../components/common/SearchBar';
import PopularMovies from '../components/home/PopularMovies';
import DropDown from '../components/common/DropDown';
import './MovieSearch.css'

// self-recursive URL prop
export default function MovieSearch({discoveryUrl}) {
  const locationValue = useLocation(); // when loading /search/ without going through a searchbar the value of e is null and causes errors, this is a workaround
  const movieName = locationValue.state && locationValue.state.e ? locationValue.state.e : null; // if entering search via url, set moviename to null and then the search doesnt get called
  const h2Name = movieName ? "Search results" : "" // h2 header text for movies listing
  const [open, setOpen] = useState(false) // toggle for showing advanced search results
  const [selectedTMDBFilter, setSelectedTMDBFilter] = useState('popularity.desc') // default to descending popularity if filter not used
  const baseURL = `${import.meta.env.VITE_API_URL}/api/tmdb`

  // if passed a discovery URL prop (advanced search), use that URL
  // if no prop, check if navigated from searchbar and use different URL
  const url = discoveryUrl ? discoveryUrl : (movieName ? `${baseURL}/search/${movieName}` : null)
  console.log(url)
  // console.log("MovieSearch: using url: ", url)
  // console.log("MovieSearch: selected TMDB filter: ", selectedTMDBFilter)
  // console.log("MovieSearch: discoveryUrl prop: ", discoveryUrl)

  const changeOpen = () => setOpen(!open) // toggles filter dropdowns visibility

  // from tmdb discovery: sort_by
  // ref: https://developer.themoviedb.org/reference/discover-movie
  // set the key as what gets sent to TMDB, and value as what is shown to user
  const sortingOptions = {
    'original_title.asc': 'Original title (A-Z)',
    'original_title.desc': 'Original title (Z-A)',
    'popularity.asc': 'Popularity (Lowest first)',
    'popularity.desc': 'Popularity (Highest first)',
    'revenue.asc': 'Revenue (Lowest first)',
    'revenue.desc': 'Revenue (Highest first)',
    'primary_release_date.asc': 'Release date (Oldest first)',
    'primary_release_date.desc': 'Release date (Newest first)',
    'title.asc': 'Title (A-Z)',
    'title.desc': 'Title (Z-A)',
    'vote_average.asc': 'Average vote (Lowest first)',
    'vote_average.desc': 'Average vote (Highest first)',
    'vote_count.asc': 'Vote count (Lowest first)',
    'vote_count.desc': 'Vote count (Highest first)',
  }

  const handleSelect = (e) => {
    // console.log("MOVIESEARCH: Selected value from DropDown: ", e)
    // iterate through all keys in sortingOptions object, and find the key which corresponds to the selected value (e)
    const selectedKey = Object.keys(sortingOptions).find(key => sortingOptions[key] === e); // sortingoptions[key] matches the current key being iterated to the value of the associated key
    // console.log("MOVIESEARCH: Setting key: ", selectedKey)
    setSelectedTMDBFilter(selectedKey)
  }

  const urlBuilder = (selectedTMDBFilter) => {
    return `${baseURL}/discover/movie?sort_by=${selectedTMDBFilter}`
  }

  const makeUrlAndSearch = () => {
    const newUrl = urlBuilder(...year, ...selectedTMDBFilter, ...year)
    console.log("Navigating to search with custom search filters url: ", newUrl)
    return <Navigate to={"/search"} state={{e: newUrl}} replace={true} />
  }

  return (
    <>
    <div id='movieSearchBar'> 
      <h1>Movie search</h1>
      <SearchBar searchDestination={"/search"}/> 

        <div id='dropDownHolder'>
          <button onClick={changeOpen} id='filterToggle'>
            {open? "Close filters" : "Open filters"}
          </button>
          
          { open ? (
            <div id='selectors'>
              <input type="text" className='inputField' placeholder='Release year'/>
              <input type="text" className='inputField' placeholder='Something else'/>
              <DropDown
                title={'Advanced sorting'}
                label={'tmdbOptions'}
                items={sortingOptions}
                onSelect={handleSelect}
              />


            </div>
          ) : (<span/> // show nothing on toggle off
          )}
          </div>
        </div>
      <PopularMovies reqUrl={url} sectionTitle={h2Name} />
    </>
  )
}




/* un-commented multi-dropdown functionality from this component since theres really no sense to have more than one
... still keeping safe for maybe later use

these are inside export default function x(){:

const [selections, setSelections] = useState({}) // JSON object of stored selections
const dropDownData = {
  // todo change these to TMDB parameters later
  year: [2021, 2022, 2023, 2024, 2025],
  language: ["Something", "something else", "yet some more"],
  genre: ["firstgenre", "second", "youknowwho"]
}

const handleSelect = (key, value) => {
  setSelections((prev) => ({
    ...prev,
    [key]: value,
  }))
  console.log(`MOVIESEARCH: Dropdown ${key} selected: ${value}`)
}


these are inside HTML return:
{/* old, more complicated version of DropDown, which allowed for multiple instances of same dropdown component
... which would set and receive values from the menus as key: value pairs inside a JSON object
... but since this implementation really only needs one theres no point to make it complicated for multiple dropdowns
... keeping code in case used elsewhere

<DropDown
  title={'Release year'}
  label={'year'}
  items={dropDownData.year}
  onSelect={(val) => handleSelect("year", val)}
  selected={selections.year || ""}
/>

<DropDown
  title={'Original language'}
  label={'lang'}
  items={dropDownData.language}
  onSelect={(val) => handleSelect("language", val)}
  selected={selections.language || ""}
/>
*/


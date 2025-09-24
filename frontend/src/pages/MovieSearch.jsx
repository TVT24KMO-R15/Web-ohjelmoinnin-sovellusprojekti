import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import SearchBar from '../components/common/SearchBar';
import PopularMovies from '../components/home/PopularMovies';
import DropDown from '../components/common/DropDown';
import './MovieSearch.css'

export default function MovieSearch() {
  const locationValue = useLocation(); // when loading /search/ without going through a searchbar the value of e is null and causes errors, this is a workaround
  const movieName = locationValue.state && locationValue.state.e ? locationValue.state.e : null; // if entering search via url, set moviename to null and then the search doesnt get called
  const h2Name = movieName ? "Search results" : "" // h2 header text for movies listing
  const [open, setOpen] = useState(false) // toggle for showing advanced search results
  const [selectedTMDBFilter, setSelectedTMDBFilter] = useState('popularity.desc') // default to descending popularity if filter not used

  // if moviename exists (received via useLocation when searching, but not on direct /search load), set url with moviename
  const url = movieName ? `http://localhost:3000/api/tmdb/search/${movieName}` : null
  // maybe create url builder function
  const paramsBuilder = () => {
    const baseurl = `http://localhost:3000/api/tmdb/search/${movieName}?=${selectedTMDBFilter}`
  }

  const changeOpen = () => setOpen(!open) // toggles filter dropdowns visibility

  // from tmdb discovery: sort_by
  // ref: https://developer.themoviedb.org/reference/discover-movie
  const sortingOptions = [
    'original_title.asc',
    'original_title.desc',
    'popularity.asc',
    'popularity.desc',
    'revenue.asc',
    'revenue.desc',
    'primary_release_date.asc',
    'primary_release_date.desc',
    'title.asc',
    'title.desc',
    'vote_average.asc',
    'vote_average.desc',
    'vote_countasc',
    'vote_countdesc'
  ]

  const handleSelect = (e) => {
    setSelectedTMDBFilter(e)
    console.log("MovieSearch: Set value to", e)
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
              <input type="text" className='inputField' placeholder='Release year'/>
              <DropDown
                title={'Something else'}
                label={'genre'}
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


import React, { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import SearchBar from '../components/common/SearchBar';
import PopularMovies from '../components/home/PopularMovies';
import DropDown from '../components/common/DropDown';
import './MovieSearch.css'

// https://developer.themoviedb.org/reference/search-movie
export default function MovieSearch() {
  const locationValue = useLocation(); // when loading /search/ without going through a searchbar the value of e is null and causes errors, this is a workaround
  const movieName = locationValue.state && locationValue.state.e ? locationValue.state.e : null; // if entering search via url, set moviename to null and then the search doesnt get called
  const h2Name = movieName ? "Search results for " + movieName : "" // h2 header text for movies listing
  const [open, setOpen] = useState(false) // toggle for showing advanced search results
  const baseURL = `${import.meta.env.VITE_API_URL}/api/tmdb`
  const url = movieName ? `${baseURL}/search/${movieName}` : null
  const changeOpen = () => setOpen(!open) // toggles filter dropdowns visibility
  const [year, setYear] = useState(null) // release year filter state
  const [options, setOptions] = useState(
    {
      primary_release_year: year,
      query: movieName ? movieName : null,
      page: 1,
    }
  ) // object to hold all filter options

  // const [url, setUrl] = useState(createUrlAndSearch()) // url to be sent to PopularMovies component
  // useEffect(() => {
  //   setUrl(createUrlAndSearch())
  // }, [year]) // update url every time year changes

  console.log(url)
  console.log("MovieSearch: using url: ", url)

  // const createUrlAndSearch = () => {
  //   return year ? `${baseURL}/search/${movieName}&primary_release_year=${year}` : `${baseURL}/search/${movieName}`
  // }


  return (
    <>
    <div id='movieSearchBar'> 
      <h1>Movie search</h1>
      <div id='customSearchBar'>
        <SearchBar searchDestination={"/search"}/> 
      </div>
        <div id='dropDownHolder'>
          <button onClick={changeOpen} id='filterToggle'>
            {open? "Close filters" : "Open filters"}
          </button>
          
          { open ? (
            <div id='filterOptions'>
              <input type="text" className='inputField' placeholder='Release year (optional)' maxLength={4} minLength={4} onChange={(e) => setYear(e.target.value)}/>
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


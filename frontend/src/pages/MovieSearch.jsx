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
  const [selections, setSelections] = useState({}) // JSON object of stored selections

  // if moviename exists (received via useLocation when searching, but not on direct /search load), set url with moviename
  const url = movieName ? `http://localhost:3000/api/tmdb/search/${movieName}` : null // todo update this url later
  const changeOpen = () => setOpen(!open) // toggles filter dropdowns visibility

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

              <DropDown
                title={'Something else'}
                label={'genre'}
                items={dropDownData.genre}
                onSelect={(val) => handleSelect("genre", val)}
                selected={selections.genre || ""}
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

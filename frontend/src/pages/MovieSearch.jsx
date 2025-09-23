import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import SearchBar from '../components/common/SearchBar';
import PopularMovies from '../components/home/PopularMovies';
import DropDown from '../components/common/DropDown';
import './MovieSearch.css'

// note to self maybe add recursive props to reuse this as advanced search, props tweaking url parameters (or whatever tmdb uses for advanced search)
// ...from dropdown menus and such
// or maybe make advanced options into its own prop for reuse elsewhere (group search refinement, review search refinement??)
export default function MovieSearch() {
  // when loading /search/ without going through a searchbar the value of e is null and causes errors, this is a workaround
  const locationValue = useLocation();
  const movieName = locationValue.state && locationValue.state.e ? locationValue.state.e : null; // if entering search via url, set moviename to null and then the search doesnt get called
  const h2Name = movieName ? "Search results" : "" // h2 header text for movies listing
  const [open, setOpen] = useState(false) // toggle for showing advanced search results

  // if moviename exists (received via useLocation when searching, but not on direct /search load), set url with moviename
  const url = movieName ? `http://localhost:3000/api/tmdb/search/${movieName}` : null 
  const changeOpen = () => {
    setOpen(!open)
  }
  const things = []
  for (let i = 0; i < 10; i ++)
  {
    things.push(i)
  }

  return (
    <>
    <div id='movieSearchBar'> 
      <h1>Movie search</h1>
      <SearchBar searchDestination={"/search"}/> 
        <div id='dropDownHolder'>
          <button onClick={changeOpen}>{open? "Close advanced filtering" : "Advanced filtering"}</button>
          { open ? 
              <div id='selectors'>
                <DropDown title={'Filter by something'} label={'dd1'} items={things}/>
                <DropDown title={'Filter by something else'} label={'dd2'} items={things}/>
                {/* <DropDown title={'Choose another filter'} label={''}/> */}
              </div> 
            : <span/> // show nothing on toggle off
          }
        </div>
    </div>
      <PopularMovies reqUrl={url} sectionTitle={h2Name} />
    </>
  )
}

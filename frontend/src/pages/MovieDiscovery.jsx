import React, { useState, useEffect } from 'react'
import DropDown from '../components/common/DropDown';
import './MovieDiscovery.css'

// https://developer.themoviedb.org/reference/discover-movie
export default function MovieDiscovery() {
  const baseURL = `${import.meta.env.VITE_API_URL}/api/tmdb/discovery/`
  //#region Filtering parameters
  // console.log("MovieDiscovery: baseURL: ", baseURL)
  const [selectedTMDBFilter, setSelectedTMDBFilter] = useState() // tmdb filter enum, see sortingoptions
  // console.log("MovieDiscovery: using filter: ", selectedTMDBFilter)
  const [releaseYear, setReleaseYear] = useState()
  
  const [urlParameters, setUrlParameters] = useState({
    sort_by: "",
    primary_release_year: "",
    // todo add more parameters here
  })

  // update url parameters on change
  useEffect(() => {
    setUrlParameters({
      sort_by: selectedTMDBFilter,
      primary_release_year: releaseYear,
    })
  }, [selectedTMDBFilter, releaseYear])

  // logging
  /*
  useEffect(() => {
    console.log("urlParameters changed: ", urlParameters)
  }, [urlParameters])
  */

  // from tmdb discovery: sort_by
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
  //#endregion


  const handleSelect = (e) => {
    // console.log("Handleselect received value: ", e)
    // match the selected value (e) to the corresponding key in sortingOptions "popularity.desc : Popularity (Highest first)"
    const selectedKey = Object.keys(sortingOptions).find(key => sortingOptions[key] === e);
    // console.log("MovieDiscovery: Setting key: ", selectedKey)
    setSelectedTMDBFilter(selectedKey)
  }

  const makeUrlAndSearch = () => {
    // todo implement a smart way to check for every filter that is set instead of chaining every combo of if else
    // for (const i in urlParameters) {
    //   if (urlParameters[i] === undefined) {
    //     delete urlParameters[i]; // remove undefined keys from object
    //   }
    //   console.log("urlParameters after cleanup: ", urlParameters)
    // }
    const newUrl = `${baseURL}?primary_release_year=${releaseYear}&sort_by=${selectedTMDBFilter}&page=`
    console.log("Navigating to search with custom search filters url: ", newUrl)
    // return <Navigate to={"/movies"} state={{e: newUrl}} replace={true} />
  }


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
    </>
  )
}

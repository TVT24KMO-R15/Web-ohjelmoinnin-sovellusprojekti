import React, { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import MovieFilters from '../components/search/MovieFilters';
import PopularMovies from '../components/home/PopularMovies';
import './MovieSearch.css'

// https://developer.themoviedb.org/reference/search-movie
export default function MovieSearch() {
  const locationValue = useLocation(); // when loading /search/ without going through a searchbar the value of e is null and causes errors, this is a workaround
  const [searchParams] = useSearchParams(); // https://reactrouter.com/api/hooks/useSearchParams, used for getting url parameters, ?movie=some+name&year=2023
  const [currentUrl, setCurrentUrl] = useState(null);

  // when navigating from searchbar, the moviename is inside location.state.e
  const movieNameFromState = locationValue.state && locationValue.state.e ? locationValue.state.e : null
  const movieNameFromParams = searchParams.get('movie') // get movie from appended url param
  const movieName = movieNameFromParams || movieNameFromState;
  const yearFromParams = searchParams.get('year'); // get year from appended url param

  const h2Name = movieName ? "Search results for " + movieName : "" // h2 header text for movies listing
  const baseURL = `${import.meta.env.VITE_API_URL}/api/tmdb/search`

  // build the url for fetching movies based on if theres a movie name and year
  useEffect(() => {
    if (movieName) {
      const params = new URLSearchParams();
      if (yearFromParams) {
        params.append('primary_release_year', yearFromParams); // if has year, add
      }
      
      const queryString = params.toString(); // to string
      const searchUrl = queryString ? `${baseURL}/${movieName}?${queryString}` : `${baseURL}/${movieName}`;
      
      console.log("MovieSearch: Built search URL:", searchUrl);
      setCurrentUrl(searchUrl);
    } else {
      setCurrentUrl(null);
    }
  }, [movieName, yearFromParams, baseURL]);

  console.log("MovieSearch: using url: ", currentUrl)

  return (
    <>
      <h1>Movie search</h1>
      <MovieFilters 
        type="search"
        baseURL={baseURL}
        searchDestination="/search"
        movieName={movieName}
      />
      <div id='results'>
        <PopularMovies reqUrl={currentUrl} sectionTitle={h2Name} />
      </div>
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


import React from 'react'
import { useLocation } from 'react-router-dom'
import MovieFilters from '../components/search/MovieFilters';
import PopularMovies from '../components/home/PopularMovies';
import './MovieSearch.css'

// https://developer.themoviedb.org/reference/search-movie
export default function MovieSearch() {
  const locationValue = useLocation(); // when loading /search/ without going through a searchbar the value of e is null and causes errors, this is a workaround
  const movieName = locationValue.state && locationValue.state.e ? locationValue.state.e : null; // if entering search via url, set moviename to null and then the search doesnt get called
  const h2Name = movieName ? "Search results for " + movieName : "" // h2 header text for movies listing
  const baseURL = `${import.meta.env.VITE_API_URL}/api/tmdb`
  const url = movieName ? `${baseURL}/search/${movieName}` : null

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
      <h1>Movie search</h1>
      <MovieFilters 
        type="search"
        baseURL={baseURL}
        searchDestination="/search"
      />
      <div id='results'>
        <PopularMovies reqUrl={url} sectionTitle={h2Name} />
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


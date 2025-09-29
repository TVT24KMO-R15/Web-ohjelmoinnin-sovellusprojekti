import React from 'react'
import { useNavigate } from 'react-router-dom'
import './ApplyFiltersBtn.css'

// button shown inside moviefilters to apply filters and navigate to destination with new url built off of filters
export default function ApplyFiltersBtn({
  releaseYear, // year input by user
  selectedTMDBFilter, // key from sortingOptions selected by user
  baseURL, // base URL for API requests
  navigationDestination = "/movies",  // default navigation destination
  movieName // only used when navigating to search page to append to URL
  }) {
  const navigate = useNavigate()
  console.log("ApplyFiltersBtn baseURL:", baseURL)
  console.log("ApplyFiltersBtn moviename:", movieName)
  // console.log("ApplyFiltersBtn props:", {releaseYear, selectedTMDBFilter, baseURL, navigationDestination, movieName})
  const makeUrlAndSearch = () => {
    const params = new URLSearchParams() // used to build ?param=value&param=value for url
    if (releaseYear) params.append('primary_release_year', releaseYear)
    if (selectedTMDBFilter) params.append('sort_by', selectedTMDBFilter)
    
    const queryString = params.toString()
    const newUrl = queryString ? `${baseURL}?${queryString}` : baseURL // if there are no parameters, just use baseURL    
    // do this when having movieName and going to search
    if (navigationDestination === "/search" && movieName) {
      const searchParams = new URLSearchParams() // create obj to build parameters into
      if (releaseYear) searchParams.append('year', releaseYear) // add the year if exists
      const searchQuery = searchParams.toString() // convert to string
      // encode special characters unto UTF-8 format for URL: " " = %20
      const searchUrl = searchQuery ? `/search?movie=${encodeURIComponent(movieName)}&${searchQuery}` : `/search?movie=${encodeURIComponent(movieName)}`
      // console.log("Navigating to search with URL:", searchUrl)
      navigate(searchUrl)
    } else {
      // navigate back to movies/discovery component with the url as state
      navigate(navigationDestination, {state:{urlParameters: newUrl}})
    }
  }

  return (
    <button onClick={makeUrlAndSearch} id='searchBtn'>
    Search with current filters
    </button>
  )
}

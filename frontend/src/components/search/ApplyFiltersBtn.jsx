import React from 'react'
import { useNavigate } from 'react-router-dom'
import './ApplyFiltersBtn.css'

export default function ApplyFiltersBtn({ releaseYear, selectedTMDBFilter, baseURL }) {
  const navigate = useNavigate()

  const makeUrlAndSearch = () => {
    // Build query parameters, filtering out undefined values
    const params = new URLSearchParams()
    if (releaseYear) params.append('primary_release_year', releaseYear)
    if (selectedTMDBFilter) params.append('sort_by', selectedTMDBFilter)
    
    const queryString = params.toString()
    const newUrl = queryString ? `${baseURL}?${queryString}` : baseURL
    console.log("Custom filters url", newUrl)
    // navigate back to movies component with the url as state
    navigate("/movies", {state:{urlParameters: newUrl}})
  }

  return (
    <button onClick={makeUrlAndSearch} id='searchBtn'>
    Search with current filters
    </button>
  )
}

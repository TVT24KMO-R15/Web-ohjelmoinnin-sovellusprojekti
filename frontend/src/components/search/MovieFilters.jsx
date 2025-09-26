import React, { useState } from 'react'
import DropDown from './DropDown'
import SearchBar from '../common/SearchBar'
import ApplyFiltersBtn from './ApplyFiltersBtn'
import './MovieFilters.css'

export default function MovieFilters({ 
  type = 'discovery', // 'discovery' or 'search'
  baseURL,
  sortingOptions,
  onFilterChange,
  searchDestination = '/search'
}) {
  const [releaseYear, setReleaseYear] = useState()
  const [selectedTMDBFilter, setSelectedTMDBFilter] = useState()
  const [open, setOpen] = useState(false)

  const handleDropdownSelect = (e) => {
    const selectedKey = Object.keys(sortingOptions).find(key => sortingOptions[key] === e)
    setSelectedTMDBFilter(selectedKey)
    if (onFilterChange) {
      onFilterChange({ selectedTMDBFilter: selectedKey, releaseYear })
    }
  }

  const handleYearChange = (e) => {
    const year = e.target.value
    setReleaseYear(year)
    if (onFilterChange) {
      onFilterChange({ selectedTMDBFilter, releaseYear: year })
    }
  }

  const toggleFilters = () => setOpen(!open)

  if (type === 'discovery') {
    return (
      <div className='movieFilters'>
        <DropDown
          title={'Sort by'}
          label={'tmdbOptions'}
          items={sortingOptions}
          onSelect={handleDropdownSelect}
        />
        <input 
          type="text" 
          className='inputField' 
          placeholder='Release year (optional)' 
          maxLength={4} 
          minLength={4} 
          onChange={handleYearChange}
        />
        <ApplyFiltersBtn 
          releaseYear={releaseYear}
          selectedTMDBFilter={selectedTMDBFilter}
          baseURL={baseURL}
        />
      </div>
    )
  }

  if (type === 'search') {
    return (
      <div className='movieFilters'>
        <div id='customSearchBar'>
          <SearchBar searchDestination={searchDestination}/> 
        </div>
        <div id='dropDownHolder'>
          <button onClick={toggleFilters} id='filterToggle'>
            {open ? "Close filters" : "Open filters"}
          </button>
          
          {open && (
            <div id='filterOptions'>
              <input 
                type="text" 
                className='inputField' 
                placeholder='Release year (optional)' 
                maxLength={4} 
                minLength={4} 
                onChange={handleYearChange}
              />
              <ApplyFiltersBtn 
                releaseYear={releaseYear}
                selectedTMDBFilter={null}
                baseURL={baseURL}
              />
            </div>
          )}
        </div>
      </div>
    )
  }

  return null
}
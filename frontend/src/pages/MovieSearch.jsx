import React from 'react'
import { useState } from 'react';
import { useLocation } from 'react-router-dom'



export default function MovieSearch() {
  const movieId = useLocation().state.e
  return (
    <div id='movieSearchContainer'> 
      <h1>Searched for</h1>
      <p>{movieId}</p>
      <div id='dropdownMenus'>
        advanced search options go here
      </div>
    </div>
  )
}

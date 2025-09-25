import React from 'react'
import './FavouritesPreview.css'

import { Link } from 'react-router-dom'

export default function FavouritesPreview() {
  return (
    <div>Favourites
      <Link to='./myfavourites' className='linkseeall'>See all</Link>
    </div>
  )
}

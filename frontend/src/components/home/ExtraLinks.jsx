import React from 'react'
import './ExtraLinks.css'
import { Link } from 'react-router-dom'

export default function ExtraLinks() {
  return (
    <div className='extraLinksDiv'>
      <Link to='/movies/' className='extraLink'>
        <article className='extraLinkArticle'>
          <h3 className='extraLinkH3'>Movies</h3>
          <p className='extraLinkP'>Browse and review movies.</p>
        </article>
      </Link>

      <Link to='/myaccount/myfavourites' className='extraLink'>
        <article className='extraLinkArticle'>
          <h3 className='extraLinkH3'>Favourites</h3>
          <p className='extraLinkP'>Share your favourite movies list to friends.</p>
        </article>
      </Link>

      <Link to='/groups/' className='extraLink'>
        <article className='extraLinkArticle'>
          <h3 className='extraLinkH3'>Groups</h3>
          <p className='extraLinkP'>Discuss movies in group pages.</p>
        </article>
      </Link>
    </div>
  )
}

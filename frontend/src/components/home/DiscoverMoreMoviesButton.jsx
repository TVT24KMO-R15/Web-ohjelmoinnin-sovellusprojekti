import React, { useEffect, useState } from 'react'
import './PopularMovies.css'
import { Link } from 'react-router-dom'
import './DiscoverMoreMoviesButton.css'

export default function DiscoverMoreMoviesButton() {
    return (
        <div className='discovermoremoviesdiv'>
            <Link to="/search" className='discovermoremovies'>Discover more movies</Link>
        </div>
    )
}

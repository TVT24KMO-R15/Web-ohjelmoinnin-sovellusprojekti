import React from 'react'
import PopularMovies from '../components/home/PopularMovies'
import Finnkino from '../components/home/Finnkino'
import ExtraLinks from '../components/home/ExtraLinks'
import LatestReviews from '../components/home/LatestReviews'
import { Link } from 'react-router-dom'


export default function Home() {
  return (
    <>
    <div>Home</div>
    <PopularMovies reqUrl={"http://localhost:3000/api/tmdb/popular"}/>
    <Finnkino />
    <ExtraLinks />
    <LatestReviews />
    </>
  )
}

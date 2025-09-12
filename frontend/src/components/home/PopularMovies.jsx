import React, { useEffect, useState } from 'react'
import axios from "axios"
import './PopularMovies.css'
import { Link } from 'react-router-dom'

export default function PopularMovies({reqUrl, sectionTitle}) {
  //const [movie, setMovie] = useState('')
  const [movies, setMovies] = useState([])


  useEffect(() => {
    setMovies([]) // cleanup list from previous searches
    const address = reqUrl // get address from parameter for flexibility

    axios.get(address)
      .then(response => {
        console.log("Axios request response data from" + address +" : ")
        console.log(response.data)
        const results = Array.isArray(response.data?.results) ? response.data.results : []
        const limit = Math.min(8, results.length) // limit results from 0-8 dependent on api results
        setMovies(results.slice(0, limit))
      })
      // catch axios issues
      .catch(err => {
        console.error('Failed to fetch movies', err)
        setMovies([])
      })
  }, [reqUrl])

  return (
    <section className='popularMoviesSection'>
      {/* if passing title to this section as a prop from elsewhere (reusing this component in search), show that instead of "Popular movies" */}
      <h2 className='sectionTitle'>{sectionTitle ? sectionTitle : "Popular Movies"}</h2>
      <div className='popularMoviesDiv'>

        {

          movies.map(item => (
            console.log("current item being iterated: "),
            console.log(item),
            <article key={item.id} className='popularMoviesArticle'>
              <Link to={`/movies/${item.id}`} className='popularmovielink'>
                <img src={"https://image.tmdb.org/t/p/w500" + item["poster_path"]}></img>
                <h3>{item.title}</h3>
              </Link>
            </article>

          ))
        }
        
      </div>
      {/* todo this is annoying when reusing component maybe move elsewhere */}
      <Link to="/movies" className='discovermoremovies'>Discover more movies</Link>
    </section>
  )
}

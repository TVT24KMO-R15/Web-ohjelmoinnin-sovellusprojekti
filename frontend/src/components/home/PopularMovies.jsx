import React, { useEffect, useState } from 'react'
import axios from "axios"
import './PopularMovies.css'
import { Link } from 'react-router-dom'

export default function PopularMovies() {
  //const [movie, setMovie] = useState('')
  const [movies, setMovies] = useState([])


  useEffect(() => {
    const address = 'http://localhost:3000/api/tmdb/popular'

    axios.get(address)
      .then(response => {
        console.log(response.data)
        let shortList = [] //shortlist contains first 4 movies from popular movies
        for (let index = 0; index < 4; index++) {
          const element = response.data.results[index];
          shortList.push(element)
          
        }
        setMovies(shortList)
      })
      
  }, [])

  return (
    <>
      <h2>Popular Movies</h2>
      <div>

        {

          movies.map(item => (
            <article key={item.id} >
              <Link to={`/movies/${item.id}`} className='popularmovielink'>
                <img src={"https://image.tmdb.org/t/p/w500" + item["poster_path"]}></img>
                <h3>{item.title}</h3>
              </Link>
            </article>

          ))
        }
        
      </div>
      <Link to="/movies" className='discovermoremovies'>Discover more movies</Link>
    </>
  )
}

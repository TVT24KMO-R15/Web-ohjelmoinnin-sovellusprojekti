import React, { useEffect, useState } from 'react'
import axios from "axios"
import './PopularMovies.css'
import { Link } from 'react-router-dom'

export default function PopularMovies({reqUrl, sectionTitle, resultLimit}) {
  //const [movie, setMovie] = useState('')
  const [movies, setMovies] = useState([])
  const [maxResults] = useState(resultLimit ? resultLimit : "8") // if passing a limit of results to this component, use that, else 8
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setMovies([]) // cleanup list from previous searches
    if (!(reqUrl)) return // loading /search/ directly passes null as url, break here to avoid breaking
    const address = reqUrl // get address from parameter for flexibility

    setLoading(true)
    axios.get(address)
      .then(response => {
        // console.log("Axios request response data from" + address +" : ")
        // console.log(response.data)
        const results = Array.isArray(response.data?.results) ? response.data.results : []
        const limit = Math.min(maxResults, results.length) // limit results from 0-x dependent on api results
        setMovies(results.slice(0, limit))
      })
      // catch axios issues
      .catch(err => {
        console.error('Failed to fetch movies', err)
        setMovies([])
      })
      .finally(() => setLoading(false))
  }, [reqUrl, maxResults])

  // If passed text into this component ? (check if search results are empty ? show not found : show text from prop) : show nothing
  const displayTitle = sectionTitle ? ((reqUrl?.includes('/tmdb/search') && !loading && movies.length === 0) ? 'No results found' : sectionTitle) : ""

  return (
    <section className='popularMoviesSection'>
      <h2 className='sectionTitle'>{displayTitle}</h2>
      <div className='popularMoviesDiv'>

        {

          movies.map(item => (
            // console.log("current item being iterated: "),
            // console.log(item),
            
            <article key={item.id} className='popularMoviesArticle'>
              <Link to={`/movies/${item.id}`} className='popularmovielink'>
                {(item["poster_path"]) ? <img src={"https://image.tmdb.org/t/p/w500" + item["poster_path"]}></img> : <img src={"../src/assets/noPoster.png"}></img>} 
                <h3>{item.title}</h3>
              </Link>
            </article>

          ))
        }
        
      </div>
      
    </section>
  )
}

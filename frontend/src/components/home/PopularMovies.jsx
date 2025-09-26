import React, { useEffect, useState } from 'react'
import axios from "axios"
import './PopularMovies.css'
import { Link } from 'react-router-dom'
import Pagination from '../search/Pagination'


export default function PopularMovies({reqUrl, sectionTitle}) {
  //const [movie, setMovie] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1) // which page of popular movies (or search results) is currently shown
  const [totalPages, setTotalPages] = useState(1) // how many pages TMDB responds that the query has

  useEffect(() => {
    setMovies([]) // cleanup list from previous searches
    if (!(reqUrl)) return // loading /search/ directly passes null as url, break here to avoid breaking
    const separator = reqUrl.includes('?') ? '&' : '?'
    const address = `${reqUrl}${separator}page=${currentPage}`
    console.log("PopularMovies: using url: ", address)
    setLoading(true)
    axios.get(address)
      .then(response => {
        // console.log("Axios request response data from" + address +" : ")
        // console.log(response.data)
        const results = Array.isArray(response.data?.results) ? response.data.results : []
        setMovies(results)

        // popularmovies has 54k pages of results, so cap the max count of pages here to 15
        if (response.data.total_pages > 15) {
          setTotalPages(15)
        } else { // if less than 15, set to total pages from TMDB or fallback to 1 if no pages in the response
          setTotalPages(response.data.total_pages || 1)
        }
      })
      // catch axios issues
      .catch(err => {
        console.error('Failed to fetch movies', err)
        setMovies([])
        setTotalPages(1) // dont render pagination component on erroring
      })
      .finally(() => setLoading(false))
  }, [reqUrl, currentPage]) // call effect when prop url or selected page changes from usestate, effect uses page from same usestate so its 1:1

  // Reset to page 1 on prop change
  useEffect(() => {
    // console.log("reqUrl changed, setting page to 1")
    setCurrentPage(1) // reset page when reqUrl changes
  }, [reqUrl]) // <- url prop


  // this gets called when changing page inside of the pagination component
  const handlePageChange = (newPage) => {
    // console.log("handlePageChange called: page changed to: " + newPage)
    setCurrentPage(newPage) // set the current page to pagination selection, which makes a new axios request with page number change 
  }

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

      {/* Pagination component shown below movie cards */}
      <Pagination 
        currentPage={currentPage} // current page shown (like /popular/1/ etc)
        totalPages={totalPages} // total pages of results from TMDB
        onPageChange={handlePageChange} // function to call when page changes inside of the pagination component
      />
    </section>
  )
}

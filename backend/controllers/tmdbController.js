import { getPopularMovies, searchForMovie, getMovieDetails } from "../services/tmdbService.js";

const getPage = (req) => {
  if (!req.params.page) {
    // console.log("no req params page found")
    return 1
  } else {
    // console.log("req params page found: " , req.params.page)
    return req.params.page
  }
}

/**
 * Calls TMDB Api endpoint and sends back results object from the request
 * @param {tmdbServiceFunction} fetchFunction function from tmdbService.js
 * @param {Number} page Page of results to be fetched
 * @param  {...any} args Optional arguments (movie name)
 * @returns `result[]` of movies
 */
const handlePagination = async (fetchFunction, page, ...args) => {
  if (page > 1) {
    // console.log("Getting multiple pages of results")
    const allResults = []
    
    for (let i = 1; i <= page; i++) {
      // console.log("going through page" , i)
      const temp = await fetchFunction(...args, i)
      
      // check if result is array and .results exists in it
      if (!Array.isArray(temp?.results) || temp.results.length === 0) {
        console.log(`Stopped at page ${i}, out of results`)
        break
      }
      
      allResults.push(...temp.results)
      
      // check if current iteration goes past the total_pages from tmdb query
      if (temp.total_pages && i >= temp.total_pages) {
        console.log(`Reached total_pages limit`)
        break
      }
    }
    
    return { results: allResults }
  } else {
    return await fetchFunction(...args, page)
  }
}

const fetchPopularMovies = async(req, res, next) => {
  const page = getPage(req)
  // console.log("Page received to fetchpopmovies: " , page)

  try {
    const popularMovies = await handlePagination(getPopularMovies, page) 
    return res.status(200).json(popularMovies)
  } catch (err) {
    return next (err)
  }
}

const searchMovie = async (req, res, next) => {
  const page = getPage(req)
  const movieName = (req.params.moviename)
  try {
    const searchResults = await handlePagination(searchForMovie, page, movieName)
    return res.status(200).json(searchResults)
  } catch (err) {
    return next (err)
  }
}

const detailMovie = async (req, res, next) => {
  const movieId = (req.params.movieId)
  try {
    const details = await getMovieDetails(movieId)
    return res.status(200).json(details)
  } catch (err) {
    return next (err)
  }
}

export { fetchPopularMovies, searchMovie, detailMovie }
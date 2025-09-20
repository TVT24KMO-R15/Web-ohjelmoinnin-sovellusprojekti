import { getPopularMovies, searchForMovie, getMovieDetails } from "../services/tmdbService.js";

const getPage = (req) => {
  if (!req.params.page) {
    console.log("no req params page found")
    return '1'
  } else {
    console.log("req params page found: " , req.params.page)
    return req.params.page
  }
}

const fetchPopularMovies = async(req, res, next) => {
  const page = getPage(req)
  console.log("Page received to fetchpopmovies: " , page)

  try {
    // if getting more than 1 page 
    if(page > 1) {
      console.log("Getting multiple pages of popular movies")
      // create table for setting all the results from one page into
      const allResults = []
      // iterate through page amount, 1--->n
      for (let i = 1; i <= page; i++) {
        // set movies to temp var
        const temp = await getPopularMovies(i)
        // check if result is array and .results exists in it
        if (Array.isArray(temp?.results)) {
          // push results[] into array
          allResults.push(...temp.results)
        }
      }
      // wrap the entire array of movies inside of results: {} again so frontend can read it 
      return res.status(200).json({results: allResults})
      
    // if not getting multiple pages, business as usual
    } else {
      const popularMovies = await getPopularMovies(page)
      return res.status(200).json(popularMovies)
    }
  } catch (err) {
    return next (err)
  }
}

const searchMovie = async (req, res, next) => {
  // console.log("searchmovie request " + req)
  // console.log("searchmovie request params" + req.params)
  // console.log(req.params.moviename)
  const page = getPage(req)
  console.log("Searchmovie page: ", page)
  const movieName = (req.params.moviename)
  try {
    if (page > 1 ) {
      console.log("Getting multiple pages of search results")
      const allResults = []
      for (let i = 1; i <= page; i++) {
        const temp = await searchForMovie(movieName, i)
        // if temp has no results array or is empty , stop
        if (!Array.isArray(temp?.results || temp.results.length === 0)) {
          console.log(`Stopped movie search at page ${i}, out of results`)
          break
        }
        // set search results from current page to results
        allResults.push(...temp.results)

        // if reached page limit
        if (i >= temp.total_pages) {
          console.log(`Reached total_pages limit in searching`)
          break
        }
      }
      // return all search results
      return res.status(200).json({results: allResults})
    } else {
      const searchResults = await searchForMovie(movieName, page)
      return res.status(200).json(searchResults)
    }
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
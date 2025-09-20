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
    const popularMovies = await getPopularMovies(page)
    return res.status(200).json(popularMovies)
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
    const searchResults = await searchForMovie(movieName, page)
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
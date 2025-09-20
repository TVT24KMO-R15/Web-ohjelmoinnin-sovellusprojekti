import axios from "axios";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const AUTH = `Bearer ${process.env.TMDB_KEY}`

const getOptions = (reqUrl) => {
  return {
    method: 'GET',
    url: reqUrl,
    headers: {
      accept: 'application/json',
      Authorization: AUTH
    }
  }
}

const getPopularMovies = async (page) => {
  console.log("Getting popular movies")
  const url = `${TMDB_BASE_URL}/movie/popular?language=en-US&page=${page}`
  const options = getOptions(url)
  const response = await axios.request(options)
  return response.data
}

const searchForMovie = async (name) => {
  console.log("Searching for movie " + name)
  const url = `${TMDB_BASE_URL}/search/movie?query=${name}&include_adult=false&language=en-US&page=1`
  const options = getOptions(url)
  const response = await axios.request(options)
  return response.data
}

const getMovieDetails = async (movieId) => {
  console.log("Getting details for movie " + movieId)
  const url= `${TMDB_BASE_URL}/movie/${movieId}?language=en-US`
  const options = getOptions(url)
  const response = await axios.request(options)
  const name = response.data.original_title
  console.log(`Movie name for ID ${movieId}:`, name)
  return response.data
}


export { getPopularMovies, searchForMovie, getMovieDetails }
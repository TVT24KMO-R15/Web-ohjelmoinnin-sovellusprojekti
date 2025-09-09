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

const getPopularMovies = async () => {
  console.log("Getting popular movies")
  const url = `${TMDB_BASE_URL}/movie/popular?language=en-US&page=1`
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


export { getPopularMovies, searchForMovie }
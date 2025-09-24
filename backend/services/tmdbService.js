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
  console.log("Getting popular movies from page " + page)
  const url = `${TMDB_BASE_URL}/movie/popular?language=en-US&page=${page}`
  const options = getOptions(url)
  const response = await axios.request(options)
  return response.data
}

const searchForMovie = async (name, page) => {
  console.log("Searching for movie " + name + " and page " + page)
  const url = `${TMDB_BASE_URL}/search/movie?query=${name}&include_adult=false&language=en-US&page=${page}`
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

const getCollection = async (collectionId) => {
  console.log("Getting collection for id " + collectionId);
  const url = `${TMDB_BASE_URL}/collection/${collectionId}?language=en-US`;
  const options = getOptions(url);
  const response = await axios.request(options)
  return response.data
}


const getDiscovery = async (filter) => {
  // convert filter json object {key: value} into ?key=value& string, so that gets used in discovery search
  let text = "?" // insert ? to the beginning
  for (const x in filter) {
    text += `${x}=${filter[x]}&`; // key=value&key=value...
  }
  const url = `${TMDB_BASE_URL}/discover/movie${text}`;
  console.log("getting TMDB discovery with url: ", url)
  const options = getOptions(url);
  const response = await axios.request(options)
  return response.data
}


export { getPopularMovies, searchForMovie, getMovieDetails, getCollection, getDiscovery }
import { getPopularMovies, searchForMovie, getMovieDetails, getCollection, getDiscovery } from "../services/tmdbService.js";

const getPage = (req) => {
  if (!req.params.page) {
    // console.log("no req params page found")
    return 1
  } else {
    // console.log("req params page found: " , req.params.page)
    return req.params.page
  }
}

const fetchPopularMovies = async(req, res, next) => {
  const page = getPage(req)
  // console.log("Page received to fetchpopmovies: " , page)

  try {
    const popularMovies = await getPopularMovies(page) 
    return res.status(200).json(popularMovies)
  } catch (err) {
    return next (err)
  }
}

const searchMovie = async (req, res, next) => {
  const page = getPage(req)
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

const fetchCollection = async (req, res, next) => {
  try {
    const data = await getCollection(req.params.collectionId);
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Kokoelman tiedot eivät latautuneet.' });
  }
};

const discoveryMovieSearch = async (req, res, next) => {
  const query = req.query // /discovery/?something=value
  try {
    const result = await getDiscovery(query)
    return res.status(200).json(result)
  } catch (err) {
    console.log("tmdbController: discoveryMovieSearch sending error:")
    return next (err)
  }
}

export { fetchPopularMovies, searchMovie, detailMovie, fetchCollection, discoveryMovieSearch }
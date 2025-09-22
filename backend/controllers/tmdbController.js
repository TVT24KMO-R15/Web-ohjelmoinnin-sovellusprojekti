import { getPopularMovies, searchForMovie, getMovieDetails, getCollection } from "../services/tmdbService.js";

const fetchPopularMovies = async(req, res, next) => {
  try {
    const popularMovies = await getPopularMovies()
    return res.status(200).json(popularMovies)
  } catch (err) {
    return next (err)
  }
}

const searchMovie = async (req, res, next) => {
  // console.log("searchmovie request " + req)
  // console.log("searchmovie request params" + req.params)
  // console.log(req.params.moviename)
  const movieName = (req.params.moviename)
  try {
    const searchResults = await searchForMovie(movieName)
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

export { fetchPopularMovies, searchMovie, detailMovie, fetchCollection }
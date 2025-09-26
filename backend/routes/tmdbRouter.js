import express from "express";
import { fetchPopularMovies, searchMovie, detailMovie, fetchCollection, discoveryMovieSearch } from "../controllers/tmdbController.js";

const router = express.Router();

router.get("/popular", fetchPopularMovies); // /url/api/tmdb/popular?page=1
router.get("/search/:moviename", searchMovie); // /url/api/tmdb/search/name?page=1
router.get("/details/:movieId", detailMovie); // /url/api/tmdb/details/movieid
router.get("/collection/:collectionId", fetchCollection); // /url/api/tmdb/collection/collectionId
router.get("/discovery/", discoveryMovieSearch); // /url/api/tmdb/discovery/?param=something&param2=somethingelse
router.get("/discovery", discoveryMovieSearch); // /url/api/tmdb/discovery?param=something&param2=somethingelse

export default router;

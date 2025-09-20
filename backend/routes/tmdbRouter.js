import express from "express";
import { fetchPopularMovies, searchMovie, detailMovie } from "../controllers/tmdbController.js";

const router = express.Router();

router.get("/popular/:page", fetchPopularMovies); // /url/api/tmdb/popular/pagenum
router.get("/popular/", fetchPopularMovies); // /url/api/tmdb/popular
router.get("/search/:moviename", searchMovie); // /url/api/tmdb/search/name
router.get("/search/:moviename/:page", searchMovie); // /url/api/tmdb/search/name/pagenum
router.get("/details/:movieId", detailMovie); // /url/api/tmdb/details/movieid

export default router;

import express from "express";
import { fetchPopularMovies, searchMovie, detailMovie, fetchCollection } from "../controllers/tmdbController.js";

const router = express.Router();

router.get("/popular", fetchPopularMovies); // /url/api/tmdb/popular
router.get("/search/:moviename", searchMovie); // /url/api/tmdb/search/name
router.get("/details/:movieId", detailMovie); // /url/api/tmdb/details/movieid
router.get("/collection/:collectionId", fetchCollection); // /url/api/tmdb/collection/collectionId

export default router;

import express from "express";
import { fetchPopularMovies, searchMovie } from "../controllers/tmdbController.js";

const router = express.Router();

router.get("/popular", fetchPopularMovies); // /url/api/tmdb/popular
router.get("/search/:moviename", searchMovie); // /url/api/tmdb/name

export default router;

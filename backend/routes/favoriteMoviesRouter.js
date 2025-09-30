import { Router } from "express";

import { addFavorite, getFavorites, deleteFavorite } from "../controllers/favoriteMoviesController.js"

const router = Router();

router.post("/add", addFavorite);
router.get("/", getFavorites);
router.post("/delete", deleteFavorite);

export default router;
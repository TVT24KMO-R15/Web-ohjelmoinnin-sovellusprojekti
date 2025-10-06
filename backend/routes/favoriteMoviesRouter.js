import { Router } from "express";

import { addFavorite, getFavorites, deleteFavorite, getPublicFavorites } from "../controllers/favoriteMoviesController.js"

const router = Router();

router.post("/add", addFavorite);
router.get("/", getFavorites);
router.get("/public/:accountId", getPublicFavorites);
router.post("/delete", deleteFavorite);

export default router;
// import jwt from "jsonwebtoken";
import { getAccountIdByEmail, getAccountIdById, insertFavorite, removeFavorite, selectFavoritesByAccountId } from "../models/favoriteMovies.js";


const addFavorite = async (req, res, next) => {
  try {
    // const token = req.headers.authorization?.split(" ")[1];
    // if (!token) return res.status(401).json({ message: "No token provided" });
    // const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // const userEmail = decoded.account;

    const { email, movieId } = req.body;
    if (!email) return res.status(401).json({ message: "No email provided" });

    const userResult = await getAccountIdByEmail(email);
    if (userResult.rows.length === 0) return res.status(404).json({ message: "User not found" });

    const userId = userResult.rows[0].accountid;

    await insertFavorite(userId, movieId);

    res.json({ message: "Added to favorites" });
  } catch (err) {
    if (err.code === '23505') { 
      return res.status(400).json({ error: "Movie already in favorites" });
    }
    next(err);
  }
};

const deleteFavorite = async (req, res, next) => {
  try {
    // const token = req.headers.authorization?.split(" ")[1];
    // if (!token) return res.status(401).json({ message: "No token provided" });
    // const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // const userEmail = decoded.account;

    const { email, movieId } = req.body;
    if (!email) return res.status(401).json({ message: "No email provided" });

    const userResult = await getAccountIdByEmail(email);
    if (userResult.rows.length === 0) return res.status(404).json({ message: "User not found" });

    const userId = userResult.rows[0].accountid;

    await removeFavorite(userId, movieId);

    res.json({ message: "Removed from favorites" });
  } catch (err) {
    next(err);
  }
};

const getFavorites = async (req, res, next) => {
  try {
    // const token = req.headers.authorization?.split(" ")[1];
    // if (!token) return res.status(401).json({ message: "No token provided" });
    // const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // const userEmail = decoded.account;

    const userEmail = req.query.email; // ei JWT:tä

    const userResult = await getAccountIdByEmail(userEmail);
    if (userResult.rows.length === 0)
      return res.status(404).json({ message: "User not found" });

    const userId = userResult.rows[0].accountid;

    const favResult = await selectFavoritesByAccountId(userId);

    res.json({ favorites: favResult.rows.map((r) => r.movieid) });
  } catch (err) {
    next(err);
  }
};

const getPublicFavorites = async (req, res, next) => {
  try {
    const { accountId } = req.params; // otetaan parametrista
    if (!accountId) return res.status(400).json({ message: "No accountId provided" });

    const userResult = await getAccountIdById(accountId);
    if (userResult.rows.length === 0)
      return res.status(404).json({ message: "User not found" });

    const favResult = await selectFavoritesByAccountId(accountId);

    res.json({ favorites: favResult.rows.map(r => r.movieid) });
  } catch (err) {
    next(err);
  }
};

export { addFavorite, getFavorites, deleteFavorite, getPublicFavorites };
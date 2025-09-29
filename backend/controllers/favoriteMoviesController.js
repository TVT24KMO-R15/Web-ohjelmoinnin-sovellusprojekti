import { pool } from "../helpers/dbHelper.js";
// import jwt from "jsonwebtoken";


const addFavorite = async (req, res, next) => {
  try {
    // const token = req.headers.authorization?.split(" ")[1];
    // if (!token) return res.status(401).json({ message: "No token provided" });
    // const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // const userEmail = decoded.account;

    const { email, movieId } = req.body;
    if (!email) return res.status(401).json({ message: "No email provided" });

    const userResult = await pool.query(
      "SELECT accountid FROM account WHERE email = $1",
      [email]
    );
    if (userResult.rows.length === 0) return res.status(404).json({ message: "User not found" });

    const userId = userResult.rows[0].accountid;

    await pool.query(
      `INSERT INTO favoritemovies (fk_accountid, movieid)
       VALUES ($1, $2)
       ON CONFLICT (fk_accountid, movieid) DO NOTHING`,
      [userId, movieId]
    );

    res.json({ message: "Added to favorites" });
  } catch (err) {
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

    const userResult = await pool.query(
      "SELECT accountid FROM account WHERE email = $1",
      [email]
    );
    if (userResult.rows.length === 0) return res.status(404).json({ message: "User not found" });

    const userId = userResult.rows[0].accountid;

    await pool.query(
      "DELETE FROM favoritemovies WHERE fk_accountid = $1 AND movieid = $2",
      [userId, movieId]
    );

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

    const userResult = await pool.query(
      "SELECT accountid FROM account WHERE email = $1",
      [userEmail]
    );
    if (userResult.rows.length === 0)
      return res.status(404).json({ message: "User not found" });

    const userId = userResult.rows[0].accountid;

    const favResult = await pool.query(
      "SELECT movieid FROM favoritemovies WHERE fk_accountid = $1",
      [userId]
    );

    res.json({ favorites: favResult.rows.map((r) => r.movieid) });
  } catch (err) {
    next(err);
  }
};

export { addFavorite, getFavorites, deleteFavorite };
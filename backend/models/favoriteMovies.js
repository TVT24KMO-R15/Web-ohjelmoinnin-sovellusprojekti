import { pool } from "../helpers/dbHelper.js";

const getAccountIdByEmail = async (email) => {
  return await pool.query("SELECT accountid FROM account WHERE email = $1", [
    email,
  ]);
};

const getAccountIdById = async (accountId) => {
  return await pool.query(
    "SELECT accountid FROM account WHERE accountid = $1",
    [accountId]
  );
};

const insertFavorite = async (accountId, movieId) => {
  return await pool.query(
    `INSERT INTO favoritemovies (fk_accountid, movieid) VALUES ($1, $2)`,
    [accountId, movieId]
  );
};

const removeFavorite = async (accountId, movieId) => {
  return await pool.query(
    `DELETE FROM favoritemovies WHERE fk_accountid = $1 AND movieid = $2`,
    [accountId, movieId]
  );
};

const selectFavoritesByAccountId = async (accountId) => {
  return await pool.query(
    `SELECT movieid FROM favoritemovies WHERE fk_accountid = $1`,
    [accountId]
  );
};

export {
  getAccountIdByEmail,
  getAccountIdById,
  insertFavorite,
  removeFavorite,
  selectFavoritesByAccountId,
};

import pool from "../config/db.config";

//**GET ALL USERS */
export const getAllUsers = async () => {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
};

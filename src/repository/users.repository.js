import pool from "../config/db.config";

//**GET ALL USERS */
export const getAllUsers = async () => {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
};

/**GET A USER BY Email */
export const getUserByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows[0];
};

//**GET A user By ID */
export const getUserByID = async (id) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [id]);
  return rows[0];
};

//**GET ALL sttudents */
export const getAllStudents = async () => {
  const [rows] = await pool.query("SELECT * FROM users WHERE role = ? ", [
    "student",
  ]);
};

//**GET All Teachers  */
export const getAllTeachers = async () => {
  const [rows] = await pool.query("SELECT * FROM users WHERE role = ? ", [
    "student",
  ]);
};

import pool from "../config/db.config.js";

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
  return rows[0];
};

//**GET All instructors  */
export const getAllInstructors = async () => {
  const [rows] = await pool.query("SELECT * FROM users WHERE role = ? ", [
    "instructor",
  ]);
  return rows[0];
};

//**create user */
export const createUser = async (data) => {
  const result = await pool.query(
    "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)",
    [data.name, data.email, data.passord, data.role]
  );
  return result.affectedRows;
};

//**update user profile by Id */
export const updateUserProfile = async (data, id) => {
  const result = await pool.query(
    "UPDATE users SET name = ?, email = ? WHERE id = ?",
    [data.name, data.email, id]
  );
  return result.affectedRows;
};

//**Change user password */
export const changePassword = async (id, password) => {
  const result = await pool.query(
    "UPDATE users set password = ? WHERE id = ?",
    [password, id]
  );
  return result.affectedRows;
};

//**update user points */
export const updatePoints = async (points, id) => {
  const result = await pool.query("UPDATE users SET points = ? WHERE id = ?", [
    points,
    id,
  ]);
  return result.affectedRows;
};

//**Get user points */
export const userPoints = async (id) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0];
};

//**update user role */
export const changeRole = async (id,role) => {
  const result = 
}
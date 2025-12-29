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
export const getUserById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
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
    "INSERT INTO users (name,email,password) VALUES (?,?,?)",
    [data.name, data.email, data.password]
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
  const result = await pool.query(
    "UPDATE users SET points =  points + ? WHERE id = ?",
    [points, id]
  );
  return result.affectedRows;
};

//**Get user points */
export const userPoints = async (user_id) => {
  const [rows] = await pool.query("SELECT points FROM users WHERE id = ?", [
    id,
  ]);
  return rows[0];
};

//**update user role */
export const changeRole = async (id, role) => {
  const result = await pool.query("UPDATE users SET role = ? WHERE id = ? ", [
    role,
    id,
  ]);
  return result.affectedRows;
};
//**Delete A user */
export const deleteUser = async (id) => {
  const result = await pool.query("DELETE FROM users WHERE id = ?", [id]);
  return result.affectedRows;
};
//**Get all instructors */
export const instructors = async () => {
  const [rows] = await pool.query("SELECT * FROM users WHERE role = ?", [
    "instrucor",
  ]);
  return rows;
};
//**Get spasafic users */
export const usersByrole = async (role) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE role = ?", [role]);
  return rows;
};

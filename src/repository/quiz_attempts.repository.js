import pool from "../config/db.config.js";

//**Add user score in a test  Attempts */
export const createQuizeAttempts = async (data) => {
  const result = await pool.query(
    "INSERT INTO quiz_attempts (user_id,quiz_id,score) VALUES (?,?,?)",
    [data.user_id, data.quiz_id, data.score]
  );
  return result.affectedRows;
};

//**Update Quize Attempt of a user*/
export const updateQuizeAttempts = async (data, id) => {
  const result = await pool.query(
    "UPDATE quize_attempts SET user_id = ? , quiz_id = ? WHERE id = ? ",
    [data.user_id, data.quiz_id, id]
  );
  return result.affectedRows;
};

//**Delete a quize attempt by a student/user */
export const deleteQuizeAttempts = async (id) => {
  const result = await pool.query("DELETE FROM quiz_attempts WHERE id = ?", [
    id,
  ]);
  return result.affectedRows;
};

//**GET a user quize attempts  */
export const userQuizAttempts = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM quiz_attempts WHERE user_id = ?",
    [id]
  );
  return rows;
};

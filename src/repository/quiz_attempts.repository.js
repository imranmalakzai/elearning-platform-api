import pool from "../config/db.config.js";

//**Add Quize Attempts */
const createQuizeAttempts = async (data) => {
  const result = await pool.query(
    "INSERT INTO quiz_attempts (user_id,quiz_id,score) VALUES (?,?,?)",
    [data.user_id, data.quiz_id, data.score]
  );
};

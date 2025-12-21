import pool from "../config/db.config.js";

//**create quize */
export const createQuizz = async (data) => {
  const result = await pool.query(
    "INSERT INTO quizzes (course_id,title) VALUES (?,?)",
    [data.course_id, data.title]
  );
  return result.affectedRows;
};

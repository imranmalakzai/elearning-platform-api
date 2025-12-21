import pool from "../config/db.config.js";

//**create quize */
export const createQuizz = async (data) => {
  const result = await pool.query(
    "INSERT INTO quizzes (course_id,title) VALUES (?,?)",
    [data.course_id, data.title]
  );
  return result.affectedRows;
};
//**update quize */
export const updateQuizz = async (id, data) => {
  const result = await pool.query(
    "UPDATE quizzes set course_id = ?, title = ? WHERE id = ?",
    [data.course_id, data.title, id]
  );
  return result.affectedRows;
};

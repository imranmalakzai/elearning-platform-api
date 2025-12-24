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
//**Delete A queize */
export const deleteQuizz = async (id) => {
  const result = await pool.query("DELETE FROM quizzes WHERE id = ? ", [id]);
  return result.affectedRows;
};
//**Get All quizes for a course */
export const courseQuizzes = async (course_id) => {
  const [rows] = await pool.query("SELECT * FROM quizzes WHERE course_id = ?", [
    id,
  ]);
  return rows;
};

//**Get Quizz by Id */
export const getQuizeById = async (quiz_id) => {
  const [rows] = await pool.query("SELECT * FROM quizzes WHERE id = ?", [
    quiz_id,
  ]);
  return rows[0];
};

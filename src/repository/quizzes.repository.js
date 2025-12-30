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
export const updateQuizz = async (id, title) => {
  const result = await pool.query("UPDATE quizzes set title = ? WHERE id = ?", [
    title,
    id,
  ]);
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
    course_id,
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

//**Get quizz by Id Belongs to a course */
export const quizBelongToCourse = async (course_id, quiz_id) => {
  const [rows] = await pool.query(
    "SELECT * FROM quizzes WHERE course_id = ? AND  id = ?",
    [course_id, quiz_id]
  );
  return rows[0];
};

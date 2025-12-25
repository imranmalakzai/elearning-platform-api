import pool from "../config/db.config.js";

//**create quesion for a quizz */
export const createQuestion = async (data) => {
  const result = await pool.query(
    "INSERT INTO questions (quiz_id,question,option_a,option_b,option_c,option_d,correct_option)",
    [
      data.quiz_id,
      data.question,
      data.option_a,
      data.option_b,
      data.option_c,
      data.option_d,
      data.correct_option,
    ]
  );
  return result.affectedRows;
};

//**update quesion in a quize */
export const updateQuestion = async (data, id) => {
  const result = await pool.query(
    "UPDATE questions SET quiz_id = ?,question = ?, option_a = ?, option_b = ?, option_c = ?, option_d  = ?, correct_option = ? WHERE id = ?",
    [
      data.quiz_id,
      data.question,
      data.option_a,
      data.option_b,
      data.option_c,
      data.option_d,
      id,
    ]
  );
  return result.affectedRows;
};

//**Delete a quizz question */
export const deleteQuestion = async (id) => {
  const result = await pool.query("DELETE FROM questions WHERE id = ? ", [id]);
  return result.affectedRows;
};

//**GET ALL QUESTION BELONGS TO A QUIZZ */
export const quizzQuestions = async (quiz_id) => {
  const [rows] = await pool.query("SELECT * FROM questions WHERE quiz_id = ?", [
    quiz_id,
  ]);
  return rows;
};

//**GET A question by Id */
export const quesion = async (id) => {
  const [rows] = await pool.query("SELECT * FROM questions WHERE id = ? ", [
    id,
  ]);
  return rows[0];
};

//**Get A quizz by quiz_id,and Id */
export const questionBelongsToQuizz = async (quiz_id, id) => {
  const [rows] = await pool.query(
    "SELECT * FROM question WHERE quiz_id = ? AND id = ?",
    [quiz_id, id]
  );
};

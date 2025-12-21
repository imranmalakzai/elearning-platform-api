import pool from "../config/db.config.js";

//**create quesion for a quizz */
export const createQuestion = async (data) => {
  const result = await pool.query(
    "INSERT INTO questions (quize_id,question,option_a,option_b,option_c,option_d,correct_option)",
    [
      data.quize_id,
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
    "UPDATE questions SET quize_id = ?,question = ?, option_a = ?, option_b = ?, option_c = ?, option_d  = ?, correct_option = ? WHERE id = ?",
    [
      data.quize_id,
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

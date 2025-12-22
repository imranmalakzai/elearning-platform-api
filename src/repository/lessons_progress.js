import pool from "../config/db.config.js";

//**track lessons progress */
export const trackProgress = async (student_id, lesson_id) => {
  const result = await pool.query(
    "INSERT INTO lesson_progress (student_id,lesson_id) VALUES (?,?)",
    [student_id, lesson_id]
  );
  return result.affectedRows;
};

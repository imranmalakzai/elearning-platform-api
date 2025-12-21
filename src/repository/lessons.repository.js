import pool from "../config/db.config.js";

//**Add A new lessons to coursse */
export const createLessons = async (data) => {
  const result = await pool.query(
    "INSERT INTO lessons (course_id,title,content,video_url,lesson_order) VALUES (?,?,?,?,?)",
    [
      data.course_id,
      data.title,
      data.content,
      data.video_url,
      data.lesson_order,
    ]
  );
  return result.affectedRows;
};

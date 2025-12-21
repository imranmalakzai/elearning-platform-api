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

//**update lesson in a course */
export const updateLessons = async (data, id) => {
  const result = await pool.query(
    "UPDATE lessons SET course_id = ?, title = ?, content = ?, video_url = ? , lesson_order = ? WHERE id = ?",
    [
      data.course_id,
      data.title,
      data.content,
      data.video_url,
      data.lesson_order,
      id,
    ]
  );
  return result.affectedRows;
};

//**Delete a course lessons */
export const deleteLessons = async (id) => {
  const result = await pool.query("DELETE FROM lessons WHERE id = ?", [id]);
  return result.affectedRows;
};

//**Get all lessons belong to one course module */
export const courseLessons = async (course_id) => {
  const [rows] = await pool.query("SELECT * FROM lessons WHERE couse_id = ?", [
    course_id,
  ]);
  return rows;
};

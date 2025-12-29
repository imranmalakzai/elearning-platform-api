import pool from "../config/db.config.js";
import { checkAndAwardBadge } from "../helper/gamefication.helper.js";

//**track lessons progress */
export const trackProgress = async (student_id, lesson_id) => {
  const result = await pool.query(
    "INSERT INTO lesson_progress (student_id,lesson_id) VALUES (?,?)",
    [student_id, lesson_id]
  );
  return result.affectedRows;
};

//**update lesson progress  */
export const updateProgress = async (std_id, lesson_id, id) => {
  const result = await pool.query(
    "UPDATE lesson_progress set student_id = ?, lesson_id = ? WHERE id = ?",
    [std_id, lesson_id, id]
  );
  return result.affectedRows;
};

//**Delelte lesson progress  */
export const deleteProgress = async (id) => {
  const result = await pool.query("DELETE FROM lesson_progress WHERE id = ?", [
    id,
  ]);
  return result.affectedRows;
};

//**Get a user all lessons progress */
export const userProgress = async (student_id) => {
  const [rows] = await pool.query(
    "SELECT * FROM lesson_progress WHERE student_id = ?",
    [student_id]
  );
  return rows;
};

//**GET CURRENT LESSON PROGRESS */
export const currentLessonProgress = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM lesson_progress WHERE id = ?",
    [id]
  );
  return rows[0];
};

//**Mark lesson as complete and give rewared */
export const markLessonCompleteAndGiveReward = async (
  user_id,
  lesson_id,
  score
) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    //mark lesson complete
    await connection.query(
      "INSERT INTO lesson_progress (user_id,lesson_id) VALUES (?,?)",
      [user_id, lesson_id]
    );
    // Update points
    await connection.query(
      "UPDATE users SET points = points + ? WHERE id = ?",
      [score, user_id]
    );

    await checkAndAwardBadge(user_id, connection);

    await connection.commit();
  } catch (error) {
    connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};
//**Get completed lessons for current user */
export const completeLessons = async (course_id, user_id) => {
  const [rows] = await pool.query(
    "SELECT COUNT (lesson_id) FROM lesson_progress Join lessons On lesson_progress.lesson_id = lessons.id WHERE lesson_progress.user_id = ? , AND lessons.course_id = ?",
    [user_id, course_id]
  );
  return rows[0];
};

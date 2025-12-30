import pool from "../config/db.config.js";

//**create an Enrollment */
export const createEnrollment = async (course_id, student_id) => {
  const result = await pool.query(
    "INSERT INTO enrollments (course_id,student_id) VALUES (?,?)",
    [course_id, student_id]
  );
  return result.affectedRows;
};

//** update on Enrollment */
export const updateEnrollment = async (course_id, student_id, id) => {
  const result = await pool.query(
    "UPDATE enrollments SET course_id = ?,student_id = ? WHERE id = ?",
    [course_id, student_id, id]
  );
  return result.affectedRows;
};

//**Delete an Enrollmetns */
export const deleteEnrollment = async (id) => {
  const result = await pool.query("DELETE FROM enrollments WHERE id = ?", [id]);
  return result.affectedRows;
};

//**Get all users Enrolled in a course */
export const courseEnrolledUsers = async (course_id) => {
  const [rows] = await pool.query(
    "SELECT * FROM enrollments WHERE course_id = ?",
    [course_id]
  );
  return rows;
};

//**check user enrolled to a course or not */
export const isEnrolled = async (course_id, student_id) => {
  const [rows] = await pool.query(
    "SELECT * FROM enrollments WHERE course_id = ? AND student_id = ?",
    [course_id, student_id]
  );
  return rows[0];
};

//**GET a users all enrolled courses */
export const userEnrolledCourses = async (student_id) => {
  const [rows] = await pool.query(
    "SELEDCT * FROM enrollments WHERE student_id = ?",
    [student_id]
  );
  return rows.affectedRows;
};

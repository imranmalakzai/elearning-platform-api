import pool from "../config/db.config.js";

//**create an Enrollment */
export const createEnrollment = async (course_id, user_id) => {
  const result = await pool.query(
    "INSERT INTO enrollments (course_id,user_id)",
    [course_id, user_id]
  );
  return result.affectedRows;
};

//** update on Enrollment */
export const updateEnrollment = async (course_id, user_id, id) => {
  const result = await pool.query(
    "UPDATE enrollments SET course_id = ?,user_id = ? WHERE id = ?",
    [course_id, user_id, id]
  );
  return result.affectedRows;
};

//**Delete an Enrollmetns */
export const deleteEnrollment = async (id) => {
  const result = await pool.query("DELETE FROM enrollments WHERE id = ?", [id]);
  return result.affectedRows;
};

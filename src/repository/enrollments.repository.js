import pool from "../config/db.config.js";

//**create an Enrollment */
export const createEnrollment = async (course_id, user_id) => {
  const result = await pool.query(
    "INSERT INTO enrollments (course_id,user_id)",
    [course_id, user_id]
  );
  return result.affectedRows;
};

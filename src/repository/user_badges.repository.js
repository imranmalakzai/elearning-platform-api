import pool from "../config/db.config.js";

//**Give a badge to student */
export const createStudentBadge = async (data) => {
  const result = await pool.query(
    "INSERT INTO user_badges (user_id,badge_id) VALUES (?,?)",
    [data.user_id, data.badge_id]
  );
  return result.affectedRows;
};

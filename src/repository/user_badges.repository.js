import pool from "../config/db.config.js";

//**Give a badge to student */
export const createStudentBadge = async (data) => {
  const result = await pool.query(
    "INSERT INTO user_badges (user_id,badge_id) VALUES (?,?)",
    [data.user_id, data.badge_id]
  );
  return result.affectedRows;
};

//**update a badge to student */
export const updateStudentBadge = async (data) => {
  const result = await pool.query(
    "UPDATE user_badges SET user_id = ?, badge_id = ?",
    [data.user_id, data.badge_id]
  );
  return result.affectedRows;
};

//**delete a student badge */
export const deleteStudentBadge = async (id) => {
  const result = await pool.query("DELETE FROM user_badges WHERE id", [id]);
  return result.affectedRows;
};

//**GET all badges of a user */
export const userBadges = async (id) => {
  const [rows] = await pool.query("SELEC * user_badges WHERE user_id = ?", [
    id,
  ]);
  return rows[0];
};

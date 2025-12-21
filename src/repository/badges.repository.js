import pool from "../config/db.config.js";

//** create A badge */
export const createBadge = async (data) => {
  const result = await pool.query(
    "INSERT INTO badges (name,description,points_required)",
    [data.name, data.description, data.points_required]
  );
  return result.affectedRows;
};

//**update A badge */
export const updateBadge = async (data, id) => {
  const result = await pool.query(
    "UPDATE badges SET name = ?, description = ?, points_required = ? WHERE id = ?",
    [data.name, data.description, data.points_required, id]
  );
  return result.affectedRows;
};

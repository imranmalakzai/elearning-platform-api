import pool from "../config/db.config.js";

//** create A badge */
export const createBadge = async (data) => {
  const result = await pool.query(
    "INSERT INTO badges (name,description,points_required)",
    [data.name, data.description, data.points_required]
  );
};

import pool from "../config/db.config.js";

//** create A badge */
export const createBadge = async (data) => {
  const result = await pool.query(
    "INSERT INTO badges (name,description,points_required) VALUES (?,?,?)",
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

//**Delete A badge */
export const deleteBadge = async (id) => {
  const result = await pool.query("DELETE FROM badges WHERE id = ? ", [id]);
  return result.affectedRows;
};

//**Getl all Badgs */
export const badges = async () => {
  const [rows] = await pool.query("SELECT * FROM badges");
  return rows;
};

//**GET a badge by Id */
export const badgeById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM badges WHERE id = ?", [id]);
  return rows[0];
};

//**GET a badge by name */
export const badgeByName = async (name) => {
  const [rows] = await pool.query("SELECT * FROM badges WHERE name = ? ", [
    name,
  ]);
  return rows[0];
};

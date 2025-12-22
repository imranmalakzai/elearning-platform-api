import pool from "../config/db.config.js";

//**Create A post forum */
export const createPost = async (data) => {
  const result = await pool.query(
    "INSERT INTO forum_posts course_id,user_id,content VALUES (?,?,?)",
    [data.course_id, data.user_id, data.content]
  );
  return result.affectedRows;
};

//**update a forum post */
export const updatePost = async (data, id) => {
  const result = await pool.query(
    "UPDATE forum_posts SET course_id = ?, user_id = ?, content = ? WHERE id = ?",
    [data.course_id, data.user_id, data.content, id]
  );
  return result.affectedRows;
};

//**Delete a forum post */
export const deleteForumPost = async (id) => {
  const result = await pool.query("DELETE FROM forum_posts WHERE id = ?", [id]);
  return result.affectedRows;
};

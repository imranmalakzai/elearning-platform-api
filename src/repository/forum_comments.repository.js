import pool from "../config/db.config.js";

//**create a comment to post in a forum */
export const createComment = async (data) => {
  const result = await pool.query(
    "INSERT INTO forum_comments (post_id,user_id,content) VALUES (?,?,?)",
    [data.post_id, data.user_id, data.content]
  );
  return result.affectedRows;
};

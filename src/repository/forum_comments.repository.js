import pool from "../config/db.config.js";

//**create a comment to post in a forum */
export const createComment = async (data) => {
  const result = await pool.query(
    "INSERT INTO forum_comments (post_id,user_id,content) VALUES (?,?,?)",
    [data.post_id, data.user_id, data.content]
  );
  return result.affectedRows;
};

//**update a comment */
export const updateComment = async (content, id) => {
  const result = await pool.query(
    "UPDATE forum_comments SET content = ? WHERE id = ?",
    [content, id]
  );
  return result.affectedRows;
};

//**delete a comment*/
export const deleteACommnet = async (id) => {
  const result = await pool.query(
    "DELETE FROM forum_comments WHERE id = ? ",
    id
  );
  return result.affectedRows;
};

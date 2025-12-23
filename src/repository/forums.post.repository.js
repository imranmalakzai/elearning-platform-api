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
export const updatePost = async (content, id) => {
  const result = await pool.query(
    "UPDATE forum_posts SET , content = ? WHERE id = ?",
    [content, id]
  );
  return result.affectedRows;
};

//**Delete a forum post */
export const deleteForumPost = async (id) => {
  const result = await pool.query("DELETE FROM forum_posts WHERE id = ?", [id]);
  return result.affectedRows;
};

//**get  forum post by Id */
export const formPost = async (id) => {
  const [rows] = await pool.query("SELECT * FROM forum_posts WHERE id = ?", [
    id,
  ]);
  return rows[0];
};

//**GET A COURSE POSTS */
export const coursePosts = async (course_id) => {
  const [rows] = await pool.query(
    "SELECT * FROM forum_posts WHERE course_id = ?",
    [course_id]
  );
  return rows;
};

//**Get a user post by Id */
export const userPost = async (post_id) => {
  const [rows] = await pool.query("SELECT * FROM forum_posts WHERE  id = ?", [
    post_id,
  ]);
  return rows[0];
};

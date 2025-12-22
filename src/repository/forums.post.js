import pool from "../config/db.config.js";

//**Create A post forum */
export const createPost = async (data) => {
  const result = await pool.query(
    "INSERT INTO forum_posts course_id,user_id,content VALUES (?,?,?)",
    [data.course_id, data.user_id, data.content]
  );
  return result.affectedRows;
};

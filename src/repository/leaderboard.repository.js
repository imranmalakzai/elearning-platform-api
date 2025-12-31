import pool from "../config/db.config.js";

//**Global Leaderboard top (20) */
export const globlal = async () => {
  const [rows] = await pool.query(
    "SELECT ROW_NUMBER() OVER (ORDER BY points DESC) AS rank,id,name,points FROM users ORDER BY points DESC LIMIT 20;"
  );
  return rows;
};

//**Top users in a course */
export const course = async (courseId) => {
  const [rows] = await pool.query(
    "SELECT ROW_NUMBER() OVER (ORDER BY s.points DESC) AS Rank, s.name, s.points FROM enrollments e JOIN users s ON e.student_id = s.id WHERE e.course_id = ?"[
      courseId
    ]
  );
  return rows;
};

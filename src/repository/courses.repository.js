import pool from "../config/db.config";

//**Create A new course */
export const createCourse = async (data) => {
  const result = await pool.query(
    "INSERT INTO courses (title,description,instructor_id) VALUES (?,?,?)",
    [data.title, data.description, data.instructor_id]
  );
  return result.affectedRows;
};

//**Get all courses */
export const courses = async () => {
  const [rows] = await pool.query("SELECT * FROM courses");
  return rows;
};

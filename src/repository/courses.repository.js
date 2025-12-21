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

//** GET all courses of one instructore */
export const instructorCourses = async (instructor_id) => {
  const [rows] = await pool.query(
    "SELECT * FROM courses WHERE instructor_id = ?",
    [instructor_id]
  );
};

//**update a course details */
export const updateCouseDetails = async (id) => {
  const result = await pool.query(
    "UPDATE courses SET title = ?, description = ? WHERE id = ?",
    [id]
  );
};

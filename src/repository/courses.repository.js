import { id } from "zod/locales";
import pool from "../config/db.config.js";

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
  return rows;
};

//**update a course details */
export const updateCouseDetails = async (id) => {
  const result = await pool.query(
    "UPDATE courses SET title = ?, description = ? WHERE id = ?",
    [id]
  );
  return result.affectedRows;
};

//**Delete course */
export const deleteCourse = async (course_id) => {
  const result = await pool.query("DELETE FROM  courses WHERE id = ? ", [
    course_id,
  ]);
  return result.affectedRows;
};

//**GET A course By Id */
export const getCourseById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM courses WHERE id = ?", [id]);
  return rows[0];
};

//**Get An instructor course */
export const instructorcourse = async (instructor_id, id) => {
  const result = await pool.query(
    "SELECT * FROM courses WHERE instructor_id = ? AND id = ?",
    [instructor_id, id]
  );
  return result.affectedRows;
};

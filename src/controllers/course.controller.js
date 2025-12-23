import asyncHandler from "../utils/async_handler.js";
import ApiError from "../utils/api_error.js";
import {
  createCourse,
  instructorcourse,
  deleteCourse,
  courses,
  getCourseById,
} from "../repository/courses.repository.js";

//**create A course (Instructor only) */
export const createCourseController = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description)
    throw new ApiError("course title and description is required", 400);
  const course = await createCourse({
    title,
    description,
    instructor_id: req.user.id,
  });
  if (!course) throw new ApiError("internal server error", 500);
  res.status(201).json({ message: "course created successfully" });
});

//**Delete a course (Instructor only) */
export const deleteCourseController = asyncHandler(async (req, res) => {
  const { course_id } = req.params;
  const course = await getCourseById(course_id);
  if (!course) throw new ApiError("course not exist", 404);

  //ensure course belongs to creater
  if (course.instructor_id.toString() !== req.user.id.toString()) {
    throw new ApiError("unauthorized", 403);
  }

  const result = await deleteCourse(course_id);
  if (!result) throw new ApiError("internal server error", 500);
  res.status(400).json({ message: "course deleted successfully" });
});

//**GET ALL COURSES */
export const coursesController = asyncHandler(async (req, res) => {
  const course = await courses();
  res.status(200).json({ courses: course });
});

//**Get a course by Id */
export const courseController = asyncHandler(async (req, res) => {
  const course = await getCourseById(req.params.id);
  if (!course) throw new ApiError("course not exist by this id ", 404);
  res.status(200).json({ course });
});

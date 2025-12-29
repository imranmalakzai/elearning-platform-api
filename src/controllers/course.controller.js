import asyncHandler from "../utils/async_handler.js";
import ApiError from "../utils/api_error.js";
import {
  createCourse,
  deleteCourse,
  courses,
  getCourseById,
  updateCouseDetails,
  instructorCourses,
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
  if (course === 0) throw new ApiError("internal server error", 500);
  res.status(201).json({ message: "course created successfully" });
});

//**update a course (Instructor only) */
export const updateCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { title, description } = req.body;
  const course = await getCourseById(courseId);
  if (!course) throw new ApiError("course not exist", 404);

  //ensure course belong to the user
  if (course.instructor_id.toString() !== req.user.id.toString()) {
    throw new ApiError("Access denied", 403);
  }
  if (!title || !description) {
    throw new ApiError("title and description is requried", 409);
  }
  const result = await updateCouseDetails({ title, description }, courseId);
  if (result === 0) throw new ApiError("Internal server error", 500);
  res.status(200).json({ message: "course updated successfully" });
});

//**Delete a course (Instructor only) */
export const deleteCourseController = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const course = await getCourseById(courseId);
  if (!course) throw new ApiError("course not exist", 404);

  //ensure course belongs to creater
  if (course.instructor_id.toString() !== req.user.id.toString()) {
    throw new ApiError("Access denied", 403);
  }

  const result = await deleteCourse(courseId);
  if (result === 0) throw new ApiError("internal server error", 500);
  res.status(400).json({ message: "course deleted successfully" });
});

//**GET ALL COURSES */
export const coursesController = asyncHandler(async (req, res) => {
  const course = await courses();
  res.status(200).json({ courses: course });
});

//**Get a course by Id */
export const getCourse = asyncHandler(async (req, res) => {
  const course = await getCourseById(req.params.courseId);
  if (!course) throw new ApiError("course not exist by this id ", 404);
  res.status(200).json({ course: course || "course not exist" });
});

//**Instructor courses */
export const getInstructorCourses = asyncHandler(async (req, res) => {
  const courses = await instructorCourses(req.params.id);
  res.status(200).json({ courses });
});

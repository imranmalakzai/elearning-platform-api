import asyncHandler from "../utils/async_handler.js";
import ApiError from "../utils/api_error.js";
import {
  createCourse,
  instructorcourse,
  deleteCourse,
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

//**Delete a course Instructor only */
export const deleteCourseController = asyncHandler(async (req, res) => {
  const isExist = await instructorcourse(req.user.id, req.params.id);
  if (isExist) throw new ApiError("course not exist", 404);
  const result = await deleteCourse(req.user.id, req.params.id);
  if (!result) throw new ApiError("internal server error", 500);
  res.status(400).json({ message: "course deleted successfully" });
});

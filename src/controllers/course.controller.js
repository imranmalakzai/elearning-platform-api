import asyncHandler from "../utils/async_handler.js";
import ApiError from "../utils/api_error.js";
import { createCourse } from "../repository/courses.repository.js";

//**create A course Instructor only */
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

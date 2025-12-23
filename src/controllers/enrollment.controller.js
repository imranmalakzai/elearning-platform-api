import asyncHandler from "../utils/async_handler.js";
import ApiError from "../utils/api_error.js";
import { getCourseById } from "../repository/courses.repository.js";
import { createEnrollment } from "../repository/enrollments.repository.js";

//**Enrolled to a course */
export const enrollToACourse = asyncHandler(async (req, res) => {
  const { course_id } = req.params;
  const course = await getCourseById(course_id);
  if (!course) throw new ApiError("course not exist", 404);
  const result = await createEnrollment(course_id, req.user.id);
  if (!result) throw new ApiError("Internal server error", 500);
  res.status(201).json({ message: "Enrolled successfully" });
});

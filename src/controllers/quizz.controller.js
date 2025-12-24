import asyncHandler from "../utils/async_handler.js";
import ApiError from "../utils/api_error.js";
import { getCourseById } from "../repository/courses.repository.js";
import { createQuizz as createQuizzRepo } from "../repository/quizzes.repository.js";

//** Create a Quizz for a course (Instructor only) */
export const createQuizz = asyncHandler(async (req, res) => {
  const { course_id } = req.params;
  const { title } = req.body;

  //is course exist
  const course = await getCourseById(course_id);
  if (!course) throw new ApiError("course not exist");

  //is instructor of the course
  const instructor = course.instructor_id.toString() === req.user.id.toString();
  if (!instructor) throw new ApiError("Access denied", 403);

  //check for title
  if (!title) throw new ApiError("please provide the title", 409);

  //quizz
  const quize = await createQuizzRepo({ course_id, title });
  if (!quize) throw new ApiError("Internal Server error", 500);

  res.status(200).json({ message: "quiz created successfully" });
});

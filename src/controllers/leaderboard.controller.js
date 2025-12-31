import asyncHandler from "../utils/async_handler.js";
import {
  course as courseLb,
  globlal,
} from "../repository/leaderboard.repository.js";
import { getCourseById } from "../repository/courses.repository.js";
import ApiError from "../utils/api_error.js";
import { isEnrolled } from "../repository/enrollments.repository.js";

//**Global ranking in controller */
export const globalRanking = asyncHandler(async (req, res) => {
  const result = await globlal();
  res.status(200).json(result);
});

//**Ranking in a course */
export const courseRanking = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  //course exist
  const course = await getCourseById(courseId);
  if (!course) throw new ApiError("course not exist", 400);

  // user && owner
  const user = await isEnrolled(courseId, req.user.id);
  const owner = course.instructor_id.toString() === req.user.id.toString();
  if (!user && !owner) throw new ApiError("please enroll first", 403);

  //get course leaderboard
  const board = await courseLb(courseId);

  res.status(200).json(board);
});

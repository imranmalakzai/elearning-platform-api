import asyncHandler from "../utils/async_handler.js";
import ApiError from "../utils/api_error.js";
import { getCourseById } from "../repository/courses.repository.js";
import {
  createEnrollment,
  isEnrolled,
  deleteEnrollment,
  courseEnrolledUsers,
} from "../repository/enrollments.repository.js";

//**Enrolled to a course (student only) */
export const enrollToACourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const course = await getCourseById(courseId);
  if (!course) throw new ApiError("course not exist", 404);

  //check user enrollments
  const enroll = await isEnrolled(courseId, req.user.id);
  if (enroll) throw new ApiError("user already enrolled to this course", 409);

  const result = await createEnrollment(courseId, req.user.id);
  if (result === 0) throw new ApiError("Internal server error", 500);
  res.status(201).json({ message: "Enrolled successfully" });
});

//**Delete user enrollment (student only) */
export const cancellEnrollment = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const course = await getCourseById(courseId);
  if (!course) throw new ApiError("course not exist", 404);

  //check user enrollments
  const enroll = await isEnrolled(courseId, req.user.id);
  if (!enroll) throw new ApiError("Not enrolled", 404);

  //delete enroll
  const result = await deleteEnrollment(enroll.id);
  if (result === 0) throw new ApiError("Internal server error", 500);

  res.status(201).json({ message: "enrollment cancelled successfully" });
});

//**Get all students Enrolled to  a course (Instructor only) */
export const courseStudents = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const course = await getCourseById(courseId);
  if (!course) throw new ApiError("course not exist", 404);
  const users = await courseEnrolledUsers(courseId);
  res.status(200).json({ users });
});

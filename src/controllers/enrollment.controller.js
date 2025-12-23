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
  const { course_id } = req.params;
  const course = await getCourseById(course_id);
  if (!course) throw new ApiError("course not exist", 404);

  //check user enrollments
  const record = await isEnrolled(course_id, req.user.id);
  if (record) throw new ApiError("user already enrolled to this course", 409);

  const result = await createEnrollment(course_id, req.user.id);
  if (!result) throw new ApiError("Internal server error", 500);
  res.status(201).json({ message: "Enrolled successfully" });
});

//**Delete user enrollment (student only) */
export const cancellEnrollment = asyncHandler(async (req, res) => {
  const { course_id } = req.params;
  const course = await getCourseById(course_id);
  if (!course) throw new ApiError("course not exist", 404);

  //check user enrollments
  const record = await isEnrolled(course_id, req.user.id);
  if (!record) throw new ApiError("Not enrolled", 404);

  //delete record
  const result = await deleteEnrollment(record.id);
  if (!result) throw new ApiError("Internal server error", 500);

  res.status(204).json({ message: "enrollment cancelled successfully" });
});

//**Get all students Enrolled to  a course (Instructor only) */
export const courseStudents = asyncHandler(async (req, res) => {
  const { course_id } = req.params;
  const course = await getCourseById(course_id);
  if (!course) throw new ApiError("course not exist", 404);
  const users = await courseEnrolledUsers(course_id);
  res.status(200).json({ users });
});

import asyncHandler from "../utils/async_handler.js";
import ApiError from "../utils/api_error.js";
import { getCourseById } from "../repository/courses.repository.js";
import {
  createQuizz as createQuizzRepo,
  updateQuizz as updateQuizzRepo,
  deleteQuizz as deleteQuizzRepo,
  getQuizeById,
} from "../repository/quizzes.repository.js";

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

//**update course  quizz (Instructor only)* /
export const updateQuizz = asyncHandler(async (req, res) => {
  const { course_id, quizz_id } = req.params;
  const { title } = req.body;

  //couse exist ?
  const course = await getCourseById(course_id);
  if (!course) throw new ApiError("course not exist");

  //is owner of the course
  const owner = course.instructor_id.toString() === req.user.id.toString();
  if (!owner) throw new ApiError("Access denied", 403);

  //is quizz exist
  const quize = await getQuizeById(quizz_id);
  if (!quize) throw new ApiError("quiz not exit", 404);

  //check for title
  if (!title) throw new ApiError("please provide the title", 409);

  //update quize
  const update = await updateQuizzRepo(quizz_id, { title, course_id });
  if (!update) throw new ApiError("Internal server error ", 500);

  res.status(200).json({ message: "quizz update successfully" });
});

//**Delete quizz (instrutor only) */
export const delteQuizz = asyncHandler(async (req, res) => {
  const { course_id, quizz_id } = req.params;

  //course exist ?
  const course = await getCourseById(course_id);
  if (!course) throw new ApiError("course not exist");

  //is owner of the course
  const owner = course.instructor_id.toString() === req.user.id.toString();
  if (!owner) throw new ApiError("Access denied", 403);

  //is quizz exist
  const quize = await getQuizeById(quizz_id);
  if (!quize) throw new ApiError("quiz not exit", 404);

  const result = await deleteQuizzRepo(quizz_id);
  if (!result) throw new ApiError("Internal server error", 500);
  res.status(200).json({ message: "quizz deleted successfully" });
});

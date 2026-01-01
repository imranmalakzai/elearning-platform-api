import asyncHandler from "../utils/async_handler.js";
import ApiError from "../utils/api_error.js";
import { getCourseById } from "../repository/courses.repository.js";
import { isEnrolled } from "../repository/enrollments.repository.js";
import {
  createQuizz as createQuizzRepo,
  updateQuizz as updateQuizzRepo,
  deleteQuizz as deleteQuizzRepo,
  getQuizeById,
  courseQuizzes,
} from "../repository/quizzes.repository.js";

//** Create a Quizz for a course (Instructor only) */
export const createQuizz = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { title } = req.body;

  //is course exist
  const course = await getCourseById(courseId);
  if (!course) throw new ApiError("course not exist", 404);

  //is instructor of the course
  const instructor = course.instructor_id.toString() === req.user.id.toString();
  if (!instructor) throw new ApiError("Access denied", 403);

  //check for title
  if (!title) throw new ApiError("please provide the title", 400);

  //quizz
  const quize = await createQuizzRepo({ course_id: courseId, title });
  if (quize === 0) throw new ApiError("Internal Server error", 500);

  res.status(200).json({ message: "quiz created successfully" });
});

//**update course  quizz (Instructor only)* /
export const updateQuizz = asyncHandler(async (req, res) => {
  const { courseId, quizId } = req.params;
  const { title } = req.body;

  //couse exist ?
  const course = await getCourseById(courseId);
  if (!course) throw new ApiError("course not exist", 404);
  //is owner of the course
  const owner = course.instructor_id.toString() === req.user.id.toString();
  if (!owner) throw new ApiError("Access denied", 403);

  //is quizz exist
  const quize = await getQuizeById(quizId);
  if (!quize) throw new ApiError("quiz not exit", 404);

  //check for title
  if (!title) throw new ApiError("please provide the title", 409);

  //update quize
  const update = await updateQuizzRepo(quizId, title);
  if (update === 0) throw new ApiError("Internal server error ", 500);

  res.status(200).json({ message: "quizz update successfully" });
});

//**Delete quizz (instrutor only) */
export const delteQuizz = asyncHandler(async (req, res) => {
  const { courseId, quizId } = req.params;

  //course exist ?
  const course = await getCourseById(courseId);
  if (!course) throw new ApiError("course not exist");

  //is owner of the course
  const owner = course.instructor_id.toString() === req.user.id.toString();
  if (!owner) throw new ApiError("Access denied", 403);

  //is quizz exist
  const quize = await getQuizeById(quizId);
  if (!quize) throw new ApiError("quiz not exit", 404);

  const result = await deleteQuizzRepo(quizId);
  if (result === 0) throw new ApiError("Internal server error", 500);
  res.status(200).json({ message: "quizz deleted successfully" });
});

//**Get all quizzes belongs to a course (enrolled student & instructor only) */
export const quizzes = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  //check if course exist
  const course = await getCourseById(courseId);
  if (!course) throw new ApiError("course not exist", 404);

  //check is ownered
  const owner = course.instructor_id.toString() === req.user.id.toString();
  //is enrolled student
  const student = await isEnrolled(courseId, req.user.id);
  if (!owner && !student) throw new ApiError("please enroll first", 403);

  //quizzes
  const quizzes = await courseQuizzes(courseId);

  res.status(200).json({ quizzes: quizzes || [] });
});

//**Get a quiz by Id */
export const quizz = asyncHandler(async (req, res) => {
  const { courseId, quizId } = req.params;

  //check course exist
  console.log(courseId);
  const course = await getCourseById(courseId);
  if (!course) throw new ApiError("course not exist", 404);

  //check is instructor or enrolled
  const student = await isEnrolled(courseId, req.user.id);
  const instructor = course.instructor_id.toString() === req.user.id.toString();

  //only instructor or student
  if (!student && !instructor) throw new ApiError("please enrolled first", 403);

  //check for quizz exist
  const quizz = await getQuizeById(quizId);
  if (!quizz) throw new ApiError("quizz  not exist", 404);

  res.status(200).json({ quizz });
});

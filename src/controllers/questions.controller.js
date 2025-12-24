import asyncHandler from "../utils/async_handler.js";
import ApiError from "../utils/api_error.js";
import { getCourseById } from "../repository/courses.repository.js";
import { quizBelongToCourse } from "../repository/quizzes.repository.js";
import {
  createQuestion as createQuestionRepo,
  questionBelongsToCourse,
  deleteQuestion,
} from "../repository/questions.repository.js";

//**create questions for a quizz of a course module */
export const createQuestion = asyncHandler(async (req, rest) => {
  const { course_id, quiz_id } = req.params;
  const { question, option_a, option_b, option_c, option_d, correct_option } =
    req.body;
  //check course exist
  const course = await getCourseById(course_id);
  if (!course) throw new ApiError("course not exit", 404);

  //check ownership
  const instructor = course.instructor_id.toString() === req.user.id.toString();
  if (!instructor) throw new ApiError("Access denied", 403);

  //check quizz exist and belong to course
  const quizz = await quizBelongToCourse(course_id, quiz_id);
  if (!quizz) throw new ApiError("quizz not found", 404);

  //check the options first
  if (
    !option_a ||
    !option_b ||
    !option_c ||
    !option_d ||
    !correct_option ||
    !question
  ) {
    throw new ApiError("please fill all the fields", 409);
  }
  //create question
  const result = await createQuestionRepo({
    option_a,
    option_b,
    option_c,
    option_d,
    correct_option,
    question,
    quiz_id,
  });

  if (!result) throw new ApiError("Internal server error", 500);
  rest.status(201).json({ message: "question created successfully" });
});

//**Delete a quizz question */
export const deleteQuizzQuestion = asyncHandler(async (req, res) => {
  const { course_id, quiz_id, question_id } = req.body;

  //is course exist
  const course = await getCourseById(course_id);
  if (!course) throw new ApiError("course not exist", 404);

  //check owner ship
  const instructor = course.instructor_id.toString() === req.user.id.toString();
  if (!instructor) throw new ApiError("Access denied", 403);

  //is quizz belongs to course
  const quizz = await quizBelongToCourse(course_id, quiz_id);
  if (!quizz) throw new ApiError("quizz not exist", 404);

  //is question belongs to quizz
  const question = await questionBelongsToCourse(quiz_id, question_id);
  if (!question) throw new ApiError("question not exist", 404);

  //result
  const result = deleteQuestion(question_id);
  if (!result) throw new ApiError("Internal server error", 500);

  res.status(204).json({ message: "message deleted successfully" });
});

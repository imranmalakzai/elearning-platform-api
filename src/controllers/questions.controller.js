import asyncHandler from "../utils/async_handler.js";
import ApiError from "../utils/api_error.js";
import { getCourseById } from "../repository/courses.repository.js";
import { quizBelongToCourse } from "../repository/quizzes.repository.js";
import { isEnrolled } from "../repository/enrollments.repository.js";
import {
  createQuestion as createQuestionRepo,
  questionBelongsToQuizz,
  deleteQuestion,
  updateQuestion,
  quizzQuestions as quizzQuestionsRepo,
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
  const { course_id, quiz_id, question_id } = req.params;

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

//**Update question of a quizz of a course module */
export const updateQuizzQuestion = asyncHandler(async (req, res) => {
  const { course_id, quiz_id, question_id } = req.params;

  const { question, option_a, option_b, option_c, option_d, correct_option } =
    req.body;

  //check the options first
  if (
    !option_a ||
    !option_b ||
    !option_c ||
    !option_d ||
    !correct_option ||
    !question
  )
    throw new ApiError("please fill all the fields", 400);

  //check course exist
  const course = await getCourseById(course_id);
  if (!course) throw new ApiError("course not exist", 404);

  //check ownership
  const instructor = course.instructor_id.toString() === req.user.id.toString();
  if (!instructor) throw new ApiError("access denied", 403);

  //check is the quize belongs to this course
  const quize = await quizBelongToCourse(course_id, quiz_id);
  if (!quize) throw new ApiError("quizz not exist", 404);

  //check is question belongs to quize
  const questionExist = await questionBelongsToQuizz(quiz_id, question_id);
  if (!questionExist) throw new ApiError("question not exist", 404);

  //result
  const result = await updateQuestion(
    { option_a, option_b, option_c, option_d, correct_option, question },
    question_id
  );
  if (!result) throw new ApiError("Internal server error", 500);
  res.status(200).json({ message: "question updated successfully" });
});

//**GET A quizz questions (Enrolled student & instructor only) */
export const quizzQuestions = asyncHandler(async (req, res) => {
  const { course_id, quiz_id } = req.params;

  //course exist
  const course = await getCourseById(course_id);
  if (!course) throw new ApiError("course not exist", 404);

  //is owner of the course  or enrol;ed to this course
  const instructor = course.instructor_id.toString() === req.user.id.toString();
  const enrStudent = await isEnrolled(course_id, req.user.id);

  //check ownership
  if (!instructor && !enrStudent) {
    throw new ApiError("please enrlled first", 403);
  }

  //check quizz belongs to course
  const quizz = await quizBelongToCourse(course_id, quiz_id);
  if (!quizz) throw new ApiError("quizz not exit or not belons to course", 404);

  //questions
  const question = await quizzQuestionsRepo(quiz_id);
  await res.status(200).json({ questions: question || [] });
});

//**Get a qustion by Id */
export const getQuestion = asyncHandler(async (req, res) => {
  const { course_id, quiz_id, question_id } = req.params;

  //course
  const course = await getCourseById(course_id);
  if (!course) throw new ApiError("course not exist", 404);

  //owner or enrolled students
  const instructor = course.instructor_id.toString() === req.user.id.toString();
  const enrStudent = await isEnrolled(course_id, req.user.id);

  if (instructor && !enrStudent) {
    throw new ApiError("Access denied", 403);
  }

  //quizz
  const quizz = await quizBelongToCourse(course_id, quiz_id);
  if (!quizz) throw new ApiError("quizz not exit", 404);

  //question
  const question = await questionBelongsToQuizz(quiz_id, question_id);
  if (!question) throw new ApiError("question not exist", 404);

  res.status(200).json({ question });
});

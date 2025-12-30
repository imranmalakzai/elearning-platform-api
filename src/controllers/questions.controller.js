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
  const { courseId, quizId } = req.params;
  const { question, option_a, option_b, option_c, option_d, correct_option } =
    req.body;
  //check course exist
  const course = await getCourseById(courseId);
  if (!course) throw new ApiError("course not exit", 404);

  //check ownership
  const instructor = course.instructor_id.toString() === req.user.id.toString();
  if (!instructor) throw new ApiError("Access denied", 403);

  //check quizz exist and belong to course
  const quizz = await quizBelongToCourse(courseId, quizId);
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
    quiz_id: quizId,
  });

  if (result === 0) throw new ApiError("Internal server error", 500);
  rest.status(201).json({ message: "question created successfully" });
});

//**Delete a quizz question */
export const deleteQuizzQuestion = asyncHandler(async (req, res) => {
  const { courseId, quizId, questionId } = req.params;

  //is course exist
  const course = await getCourseById(courseId);
  if (!course) throw new ApiError("course not exist", 404);

  //check owner ship
  const instructor = course.instructor_id.toString() === req.user.id.toString();
  if (!instructor) throw new ApiError("Access denied", 403);

  //is quizz belongs to course
  const quizz = await quizBelongToCourse(courseId, quizId);
  if (!quizz) throw new ApiError("quizz not exist", 404);

  //is question belongs to quizz
  const question = await questionBelongsToQuizz(quizId, questionId);
  if (!question) throw new ApiError("question not exist", 404);

  //result
  const result = deleteQuestion(questionId);
  if (result === 0) throw new ApiError("Internal server error", 500);

  res.status(200).json({ message: "message deleted successfully" });
});

//**Update question of a quizz of a course module */
export const updateQuizzQuestion = asyncHandler(async (req, res) => {
  const { courseId, quizId, questionId } = req.params;

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
  const course = await getCourseById(courseId);
  if (!course) throw new ApiError("course not exist", 404);

  //check ownership
  const instructor = course.instructor_id.toString() === req.user.id.toString();
  if (!instructor) throw new ApiError("access denied", 403);

  //check is the quize belongs to this course
  const quize = await quizBelongToCourse(courseId, quizId);
  if (!quize) throw new ApiError("quizz not exist", 404);

  //check is question belongs to quize
  const questionExist = await questionBelongsToQuizz(quizId, questionId);
  if (!questionExist) throw new ApiError("question not exist", 404);

  //result
  const result = await updateQuestion(
    { option_a, option_b, option_c, option_d, correct_option, question },
    questionId
  );
  if (result === 0) throw new ApiError("Internal server error", 500);
  res.status(200).json({ message: "question updated successfully" });
});

//**GET A quizz questions (Enrolled student & instructor only) */
export const quizzQuestions = asyncHandler(async (req, res) => {
  const { courseId, quizId } = req.params;

  //course exist
  const course = await getCourseById(courseId);
  if (!course) throw new ApiError("course not exist", 404);

  //is owner of the course  or enrol;ed to this course
  const instructor = course.instructor_id.toString() === req.user.id.toString();
  const enrStudent = await isEnrolled(courseId, req.user.id);

  //check ownership
  if (!instructor && !enrStudent) {
    throw new ApiError("please enrlled first", 403);
  }

  //check quizz belongs to course
  const quizz = await quizBelongToCourse(courseId, quizId);
  if (!quizz) throw new ApiError("quizz not exit or not belons to course", 404);

  //questions
  const question = await quizzQuestionsRepo(quizId);
  await res.status(200).json({ questions: question || [] });
});

//**Get a qustion by Id */
export const getQuestion = asyncHandler(async (req, res) => {
  const { courseId, quizId, questionId } = req.params;

  //course
  const course = await getCourseById(courseId);
  if (!course) throw new ApiError("course not exist", 404);

  //owner or enrolled students
  const instructor = course.instructor_id.toString() === req.user.id.toString();
  const enrStudent = await isEnrolled(courseId, req.user.id);

  if (!instructor && !enrStudent) {
    throw new ApiError("Access denied", 403);
  }

  //quizz
  const quizz = await quizBelongToCourse(courseId, quizId);
  if (!quizz) throw new ApiError("quizz not exit", 404);

  //question
  const question = await questionBelongsToQuizz(quizId, questionId);
  if (!question) throw new ApiError("question not exist", 404);

  res.status(200).json({ question });
});

import asyncHandler from "../utils/async_handler.js";
import ApiError from "../utils/api_error.js";
import { getCourseById } from "../repository/courses.repository.js";
import { quizBelongToCouse } from "../repository/quizzes.repository.js";
import { createQuestion as createQuestionRepo } from "../repository/questions.repository.js";

//**create questions for a quizz of a course module */
export const createQuestion = asyncHandler(async (req, rest) => {
  const { course_id, quizz_id } = req.params;
  const { question, option_a, option_b, option_c, option_d, correct_option } =
    req.body;

  //check course exist
  const course = await getCourseById(course_id);
  if (!course) throw new ApiError("course not exit", 404);

  //check ownership
  const instructor = course.instructor_id.toString() === req.user.id.toString();
  if (!instructor) throw new ApiError("Access denied", 403);

  //check quizz exist and belong to course
  const quizz = await quizBelongToCouse(course_id, quizz_id);
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
    quize_id: quizz_id,
  });

  if (!result) throw new ApiError("Internal server error", 500);
  rest.status(201).json({ message: "question created successfully" });
});

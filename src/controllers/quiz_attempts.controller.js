import asyncHandler from "../utils/async_handler.js";
import ApiError from "../utils/api_error.js";
import { getQuizeById } from "../repository/quizzes.repository.js";
import { isEnrolled } from "../repository/enrollments.repository.js";
import { correctAnswers } from "../repository/questions.repository.js";
import {
  attemptQuizAndUpdateUserPoints,
  userQuizzAtempt,
} from "../repository/quiz_attempts.repository.js";
import { updatePoints } from "../repository/users.repository.js";

export const attemptQuiz = asyncHandler(async (req, res) => {
  const { quiz_id } = req.params;
  const user_id = req.user.id;

  //  Quiz check
  const quiz = await getQuizeById(quiz_id);
  if (!quiz) throw new ApiError("Quiz not found", 404);

  //  Enrollment check
  const enrolled = await isEnrolled(quiz.course_id, user_id);
  if (!enrolled) throw new ApiError("Enroll first", 403);

  //  Prevent re-attempt
  const alreadyAttempted = await userQuizzAtempt(quiz_id, user_id);
  if (alreadyAttempted) {
    throw new ApiError("Quiz already attempted", 409);
  }

  //  Validate answers
  const { answers } = req.body;
  if (!Array.isArray(answers) || answers.length === 0) {
    throw new ApiError("Please provide answers", 400);
  }

  //  Fetch correct options
  const correctOptions = await correctAnswers(quiz_id);
  if (correctOptions.length === 0) {
    throw new ApiError("Quiz has no questions", 400);
  }

  let correctAns = 0;

  //  Calculate
  for (const A of answers) {
    const q = correctOptions.find((q) => q.id === A.question_id);
    if (!q) continue;

    if (q.correct_option === A.selected_option) {
      correctAns++;
    }
  }

  const totalQuestions = correctOptions.length;
  const score = Math.round((correctAns / totalQuestions) * 100);

  // Save attempt
  const result = await attemptQuizAndUpdateUserPoints({
    user_id,
    quiz_id,
    score,
  });

  if (!result) throw new ApiError("Internal server error", 500);

  //  Response
  res.status(201).json({
    message: "Quiz attempted successfully",
    total_questions: totalQuestions,
    correct_answers: correctAns,
    score,
  });
});

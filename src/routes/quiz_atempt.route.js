import e from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { attemptQuiz } from "../controllers/quiz_attempts.controller.js";
import { validate } from "../middlewares/validate.mddleware.js";
import { quizAttemptSchema } from "../validation/quiz_attempt.schema.js";

const quizAttemptRouter = e.Router({ mergeParams: true });
quizAttemptRouter.use(auth);

/**
 * @swagger
 * tags:
 *   name: Quiz Attempts
 *   description: Attempt quizzes and submit answers
 */

/**
 * @swagger
 * /courses/{courseId}/quizzes/{quizId}/attempt:
 *   post:
 *     summary: Submit answers for a quiz
 *     tags: [Quiz Attempts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the course
 *       - in: path
 *         name: quizId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the quiz
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - answers
 *             properties:
 *               answers:
 *                 type: array
 *                 description: List of answers for the quiz
 *                 items:
 *                   type: object
 *                   required:
 *                     - question_id
 *                     - selected_option
 *                   properties:
 *                     question_id:
 *                       type: integer
 *                       example: 1
 *                     selected_option:
 *                       type: string
 *                       enum: [a, b, c, d]
 *                       example: "a"
 *     responses:
 *       200:
 *         description: Quiz submitted successfully
 *       400:
 *         description: Validation error
 */
quizAttemptRouter.route("/").post(validate(quizAttemptSchema), attemptQuiz);

export default quizAttemptRouter;

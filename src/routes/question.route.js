import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/allowed_roles.middleware.js";
import {
  createQuestion,
  deleteQuizzQuestion,
  updateQuizzQuestion,
  getQuestion,
  quizzQuestions,
} from "../controllers/questions.controller.js";

const questionRouter = express.Router({ mergeParams: true });

questionRouter.use(auth);

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: Quiz questions management
 */

//**Route End points */

/**
 * @swagger
 * /courses/{courseId}/quizzes/{quizId}/questions:
 *   post:
 *     summary: Add a new question to a quiz
 *     tags: [Questions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: quizId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - option_a
 *               - option_b
 *               - option_c
 *               - option_d
 *               - correct_option
 *             properties:
 *               question:
 *                 type: string
 *                 example: What is the capital of France?
 *               option_a:
 *                 type: string
 *                 example: Paris
 *               option_b:
 *                 type: string
 *                 example: London
 *               option_c:
 *                 type: string
 *                 example: Berlin
 *               option_d:
 *                 type: string
 *                 example: Madrid
 *               correct_option:
 *                 type: string
 *                 enum: [a, b, c, d]
 *                 example: a
 *     responses:
 *       201:
 *         description: Question created successfully
 *       403:
 *         description: Only instructors can create questions
 */
questionRouter.route("/").post(allowRoles("instructor"), createQuestion);

questionRouter.route("/").post(allowRoles("instructor"), createQuestion);
/**
 * @swagger
 * /courses/{courseId}/quizzes/{quizId}/questions:
 *   get:
 *     summary: Get all questions of a quiz
 *     tags: [Questions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Course ID
 *       - in: path
 *         name: quizId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Quiz ID
 *     responses:
 *       200:
 *         description: List of quiz questions
 */
questionRouter.route("/").get(quizzQuestions);
/**
 * @swagger
 * /courses/{courseId}/quizzes/{quizId}/questions/{questionId}:
 *   get:
 *     summary: Get a specific question
 *     tags: [Questions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: quizId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Question fetched
 *       404:
 *         description: Question not found
 */
questionRouter.route("/:questionId").get(getQuestion);

/**
 * @swagger
 * /courses/{courseId}/quizzes/{quizId}/questions/{questionId}:
 *   delete:
 *     summary: Delete a quiz question
 *     tags: [Questions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: quizId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Question deleted successfully
 *       403:
 *         description: Only instructors can delete questions
 */
questionRouter
  .route("/:questionId")
  .delete(allowRoles("instructor"), deleteQuizzQuestion);

questionRouter
  .route("/:questionId")
  .delete(allowRoles("instructor"), deleteQuizzQuestion);
/**
 * @swagger
 * /courses/{courseId}/quizzes/{quizId}/questions/{questionId}:
 *   put:
 *     summary: Update a quiz question
 *     tags: [Questions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: quizId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               option_a:
 *                 type: string
 *               option_b:
 *                 type: string
 *               option_c:
 *                 type: string
 *               option_d:
 *                 type: string
 *               correct_option:
 *                 type: string
 *                 enum: [a, b, c, d]
 *     responses:
 *       200:
 *         description: Question updated successfully
 *       403:
 *         description: Only instructors can update questions
 */
questionRouter
  .route("/:questionId")
  .put(allowRoles("instructor"), updateQuizzQuestion);

export default questionRouter;

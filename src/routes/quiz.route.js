import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/allowed_roles.middleware.js";
import { validate } from "../middlewares/validate.mddleware.js";
import {
  createQuizSchema,
  updateQuizSchema,
} from "../validation/quiz.schema.js";
import {
  quizz,
  quizzes,
  createQuizz,
  updateQuizz,
  delteQuizz,
} from "../controllers/quizz.controller.js";

const quizzRouter = express.Router({ mergeParams: true });
quizzRouter.use(auth);

/**
 * @swagger
 * tags:
 *   name: Quizzes
 *   description: Course quizzes management
 */

/**
 * @swagger
 * /courses/{courseId}/quizzes:
 *   get:
 *     summary: Get all quizzes of a course
 *     tags: [Quizzes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of quizzes
 */
quizzRouter.route("/").get(quizzes);

/**
 * @swagger
 * /courses/{courseId}/quizzes:
 *   post:
 *     summary: Create a quiz for a course
 *     tags: [Quizzes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:
 *                 type: string
 *                 example: Final Exam Quiz
 *     responses:
 *       201:
 *         description: Quiz created successfully
 *       403:
 *         description: Only instructors can create quizzes
 */
quizzRouter
  .route("/")
  .post(allowRoles("instructor"), validate(createQuizSchema), createQuizz);

/**
 * @swagger
 * /courses/{courseId}/quizzes/{quizId}:
 *   patch:
 *     summary: Update quiz title
 *     tags: [Quizzes]
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
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Quiz Title
 *     responses:
 *       200:
 *         description: Quiz updated successfully
 *       403:
 *         description: Only instructors can update quizzes
 */
quizzRouter
  .route("/:quizId")
  .patch(allowRoles("instructor"), validate(updateQuizSchema), updateQuizz);
/**
 * @swagger
 * /courses/{courseId}/quizzes/{quizId}:
 *   delete:
 *     summary: Delete a quiz
 *     tags: [Quizzes]
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
 *     responses:
 *       200:
 *         description: Quiz deleted successfully
 *       403:
 *         description: Only instructors can delete quizzes
 */
quizzRouter.route("/:quizId").delete(allowRoles("instructor"), delteQuizz);

quizzRouter.route("/:quizId").delete(allowRoles("instructor"), delteQuizz);
/**
 * @swagger
 * /courses/{courseId}/quizzes/{quizId}:
 *   get:
 *     summary: Get quiz details
 *     tags: [Quizzes]
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
 *     responses:
 *       200:
 *         description: Quiz fetched successfully
 *       404:
 *         description: Quiz not found
 */
quizzRouter.route("/:quizId").get(quizz);

export default quizzRouter;

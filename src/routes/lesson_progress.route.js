import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import {
  courseProgress,
  markLessonComplete,
} from "../controllers/lessons_progress.controller.js";

const lessonProgressRouter = express.Router({ mergeParams: true });

/**
 * @swagger
 * tags:
 *   name: Lesson Progress
 *   description: Track and update course lesson progress
 */

/**
 * @swagger
 * /courses/{courseId}/progress:
 *   get:
 *     summary: Get course progress for the current user
 *     tags: [Lesson Progress]
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
 *         description: User's progress for the course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 courseId:
 *                   type: integer
 *                   example: 1
 *                 completedLessons:
 *                   type: array
 *                   items:
 *                     type: integer
 *                   example: [1, 2, 3]
 *                 totalLessons:
 *                   type: integer
 *                   example: 5
 */
lessonProgressRouter.route("/").get(courseProgress);

/**
 * @swagger
 * /courses/{courseId}/progress/{lessonId}:
 *   post:
 *     summary: Mark a lesson as complete for the current user
 *     tags: [Lesson Progress]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lesson marked as complete
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 lessonId:
 *                   type: integer
 *                   example: 2
 *                 status:
 *                   type: string
 *                   example: "completed"
 *       404:
 *         description: Lesson not found
 */
lessonProgressRouter.route("/:lessonId").post(markLessonComplete);

export default lessonProgressRouter;

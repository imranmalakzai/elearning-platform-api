import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/allowed_roles.middleware.js";
import { validate } from "../middlewares/validate.mddleware.js";
import {
  createLessonSchema,
  updateLessonSchema,
} from "../validation/lesson.schema.js";

// controllers
import {
  courseLessons,
  createLesson,
  updateLesson,
  deleteLesson,
  getLesson,
} from "../controllers/lessons.controller.js";

const lessonRouter = express.Router({ mergeParams: true });
/**
 * @swagger
 * tags:
 *   name: Lessons
 *   description: Lessons management within courses
 */

/**
 * @swagger
 * /courses/{courseId}/lessons:
 *   get:
 *     summary: Get all lessons of a course
 *     tags: [Lessons]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the course
 *     responses:
 *       200:
 *         description: List of lessons
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 lessons:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       content:
 *                         type: string
 *                       video_url:
 *                         type: string
 *                       lesson_order:
 *                         type: integer
 *                 success:
 *                   type: boolean
 *       404:
 *         description: Course not found
 */

lessonRouter.get("/", auth, courseLessons);
/**
 * @swagger
 * /courses/{courseId}/lessons/{lessonId}:
 *   get:
 *     summary: Get a specific lesson
 *     tags: [Lessons]
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
 *         description: Lesson fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 lesson:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     content:
 *                       type: string
 *                     video_url:
 *                       type: string
 *                     lesson_order:
 *                       type: integer
 *       404:
 *         description: Course or lesson not found
 */

lessonRouter.get("/:lessonId", auth, getLesson);

/**
 * ======================
 * INSTRUCTOR ONLY
 * ======================
 */

/**
 * @swagger
 * /courses/{courseId}/lessons:
 *   post:
 *     summary: Create a new lesson
 *     tags: [Lessons]
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
 *             required:
 *               - title
 *               - content
 *               - video_url
 *               - lesson_order
 *             properties:
 *               title:
 *                 type: string
 *                 example: Introduction to React
 *               content:
 *                 type: string
 *                 example: This lesson covers React basics...
 *               video_url:
 *                 type: string
 *                 example: https://www.youtube.com/watch?v=dQw4w9WgXcQ
 *               lesson_order:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Lesson created successfully
 *       403:
 *         description: Only instructors can create lessons
 *       400:
 *         description: Validation error
 */

lessonRouter.post(
  "/",
  auth,
  validate(createLessonSchema),
  allowRoles("instructor"),
  createLesson
);

/**
 * @swagger
 * /courses/{courseId}/lessons/{lessonId}:
 *   put:
 *     summary: Update a lesson
 *     tags: [Lessons]
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               video_url:
 *                 type: string
 *               lesson_order:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Lesson updated successfully
 *       403:
 *         description: Only instructors can update lessons
 *       404:
 *         description: Course or lesson not found
 */

lessonRouter.put(
  "/:lessonId",
  auth,
  validate(updateLessonSchema),
  allowRoles("instructor"),
  updateLesson
);
/**
 * @swagger
 * /courses/{courseId}/lessons/{lessonId}:
 *   delete:
 *     summary: Delete a lesson
 *     tags: [Lessons]
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
 *         description: Lesson deleted successfully
 *       403:
 *         description: Only instructors or admins can delete lessons
 *       404:
 *         description: Course or lesson not found
 */

lessonRouter.delete(
  "/:lessonId",
  auth,
  allowRoles("instructor", "admin"),
  deleteLesson
);

export default lessonRouter;

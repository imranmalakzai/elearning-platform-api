import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/allowed_roles.middleware.js";
import { validate } from "../middlewares/validate.mddleware.js";

// validation
import {
  createCourseShema,
  updateCourseShema,
} from "../validation/course.schema.js";

// child routers
import lessonRouter from "./lesson.route.js";
import forumPostRouter from "./forum_post.route.js";
import commentRouter from "./forum_comment.route.js";
import quizRouter from "./quiz.route.js";
import questionRouter from "./question.route.js";
import quizAttemptRouter from "./quiz_atempt.route.js";
import lessonProgressRouter from "./lesson_progress.route.js";
import enrollmentRouter from "./enrollment.route.js";

// controllers
import {
  createCourseController,
  updateCourse,
  deleteCourseController,
  coursesController,
  getCourse,
} from "../controllers/course.controller.js";

const courseRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Course management (main resource)
 */

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: List of courses
 */
courseRouter.get("/", coursesController);

/**
 * @swagger
 * /api/courses/{courseId}:
 *   get:
 *     summary: Get course details by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Course fetched successfully
 *       404:
 *         description: Course not found
 */
courseRouter.get("/:courseId", getCourse);

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description]
 *             properties:
 *               title:
 *                 type: string
 *                 example: Full Stack Web Development
 *               description:
 *                 type: string
 *                 example: Learn MERN stack from scratch
 *     responses:
 *       201:
 *         description: Course created successfully
 *       403:
 *         description: Only instructors can create courses
 */
courseRouter.post(
  "/",
  auth,
  validate(createCourseShema),
  allowRoles("instructor"),
  createCourseController
);

/**
 * @swagger
 * /api/courses/{courseId}:
 *   put:
 *     summary: Update a course
 *     tags: [Courses]
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
 *             required: [title, description]
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Course Title
 *               description:
 *                 type: string
 *                 example: Updated course description
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       403:
 *         description: Only instructors can update courses
 *       404:
 *         description: Course not found
 */
courseRouter.put(
  "/:courseId",
  auth,
  validate(updateCourseShema),
  allowRoles("instructor"),
  updateCourse
);

/**
 * @swagger
 * /api/courses/{courseId}:
 *   delete:
 *     summary: Delete a course
 *     tags: [Courses]
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
 *         description: Course deleted successfully
 *       403:
 *         description: Only instructors or admins can delete courses
 *       404:
 *         description: Course not found
 */
courseRouter.delete(
  "/:courseId",
  auth,
  allowRoles("instructor", "admin"),
  deleteCourseController
);

/**
 * ======================
 * NESTED RESOURCES
 * ======================
 */
courseRouter.use("/:courseId/lessons", lessonRouter);
courseRouter.use("/:courseId/forums", forumPostRouter);
courseRouter.use("/:courseId/forums/:postId/comments", commentRouter);
courseRouter.use("/:courseId/quizzes", quizRouter);
courseRouter.use("/:courseId/quizzes/:quizId/questions", questionRouter);
courseRouter.use("/:courseId/quizzes/:quizId/attempt", quizAttemptRouter);
courseRouter.use("/:courseId/progress", lessonProgressRouter);
courseRouter.use("/:courseId/enroll", enrollmentRouter);

export default courseRouter;

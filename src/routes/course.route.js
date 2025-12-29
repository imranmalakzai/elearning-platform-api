import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/allowed_roles.middleware.js";

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
 * ======================
 * PUBLIC COURSES
 * ======================
 */
courseRouter.get("/", coursesController);
courseRouter.get("/:courseId", getCourse);

/**
 * ======================
 * INSTRUCTOR / ADMIN
 * ======================
 */
courseRouter.post("/", auth, allowRoles("instructor"), createCourseController);

courseRouter.put("/:courseId", auth, allowRoles("instructor"), updateCourse);

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

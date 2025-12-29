import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/allowed_roles.middleware.js";

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
 * ======================
 * PUBLIC / ENROLLED USERS
 * ======================
 */
lessonRouter.get("/", auth, courseLessons);
lessonRouter.get("/:lessonId", auth, getLesson);

/**
 * ======================
 * INSTRUCTOR ONLY
 * ======================
 */
lessonRouter.post("/", auth, allowRoles("instructor"), createLesson);

lessonRouter.put("/:lessonId", auth, allowRoles("instructor"), updateLesson);

lessonRouter.delete(
  "/:lessonId",
  auth,
  allowRoles("instructor", "admin"),
  deleteLesson
);

export default lessonRouter;

import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/allowed_roles.middleware.js";

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
courseRouter.get("/:id", getCourse);

/**
 * ======================
 * INSTRUCTOR ONLY
 * ======================
 */
courseRouter.post("/", auth, allowRoles("instructor"), createCourseController);

courseRouter.put("/:id", auth, allowRoles("instructor"), updateCourse);

courseRouter.delete(
  "/:id",
  auth,
  allowRoles("instructor", "admin"),
  deleteCourseController
);

export default courseRouter;

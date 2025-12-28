import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import {
  courseProgress,
  markLessonComplete,
} from "../controllers/lessons_progress.controller.js";

const lessonProgressRouter = express.Router({ mergeParams: true });

lessonProgressRouter.use(auth);
lessonProgressRouter.route("/").get(courseProgress);
lessonProgressRouter.route("/:lessonId").post(markLessonComplete);

export default lessonProgressRouter;

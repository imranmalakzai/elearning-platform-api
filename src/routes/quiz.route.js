import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/allowed_roles.middleware.js";
import { validate } from "../middlewares/validate.mddleware.js";
import {
  createLessonSchema,
  updateLessonSchema,
} from "../validation/lesson.schema.js";
import {
  quizz,
  quizzes,
  createQuizz,
  updateQuizz,
  delteQuizz,
} from "../controllers/quizz.controller.js";

const quizzRouter = express.Router({ mergeParams: true });
quizzRouter.use(auth);

quizzRouter.route("/").get(quizzes);
quizzRouter
  .route("/")
  .post(allowRoles("instructor"), validate(createLessonSchema), createQuizz);
quizzRouter
  .route("/:quizId")
  .patch(allowRoles("instructor"), validate(updateLessonSchema), updateQuizz);
quizzRouter.route("/:quizId").delete(allowRoles("instructor"), delteQuizz);
quizzRouter.route("/:quizId").get(quizz);

export default quizzRouter;

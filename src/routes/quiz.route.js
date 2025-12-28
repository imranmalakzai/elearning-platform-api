import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/allowed_roles.middleware.js";
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
quizzRouter.route("/").post(allowRoles("instructor"), createQuizz);
quizzRouter.route("/:quizId").put(allowRoles("instractor"), updateQuizz);
quizzRouter.route("/:quizId").delete(allowRoles("instructor"), delteQuizz);
quizzRouter.route("/:quizId").get(quizz);

export default quizzRouter;

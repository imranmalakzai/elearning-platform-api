import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/allowed_roles.middleware.js";
import {
  createQuestion,
  deleteQuizzQuestion,
  updateQuizzQuestion,
  getQuestion,
  quizzQuestions,
} from "../controllers/questions.controller.js";

const questionRouter = express.Router({ mergeParams: true });

questionRouter.use(auth);

//**Route End points */
questionRouter.route("/").post(allowRoles("instructor"), createQuestion);
questionRouter.route("/").get(quizzQuestions);
questionRouter.route("/:questionId").get(getQuestion);

questionRouter
  .route("/:questionId")
  .delete(allowRoles("instructor"), deleteQuizzQuestion);

questionRouter
  .route("/:questionId")
  .put(allowRoles("instructor"), updateQuizzQuestion);

export default questionRouter;

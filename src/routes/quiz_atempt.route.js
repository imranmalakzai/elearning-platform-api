import e from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { attemptQuiz } from "../controllers/quiz_attempts.controller.js";

const quizAttemptRouter = e.Router({ mergeParams: true });
quizAttemptRouter.use(auth);

quizAttemptRouter.route("/attempt").post(attemptQuiz);

export default quizAttemptRouter;

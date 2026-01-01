import e from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { attemptQuiz } from "../controllers/quiz_attempts.controller.js";
import { validate } from "../middlewares/validate.mddleware.js";
import { quizAttemptSchema } from "../validation/quiz_attempt.schema.js";

const quizAttemptRouter = e.Router({ mergeParams: true });
quizAttemptRouter.use(auth);

quizAttemptRouter.route("/").post(validate(quizAttemptSchema), attemptQuiz);

export default quizAttemptRouter;

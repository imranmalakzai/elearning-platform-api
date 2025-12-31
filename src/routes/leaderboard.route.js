import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import {
  globalRanking,
  courseRanking,
} from "../controllers/leaderboard.controller.js";
const leaderboardRouter = express.Router();

leaderboardRouter.use(auth);
leaderboardRouter.route("/global").get(globalRanking);
leaderboardRouter.route("/:courseId").get(courseRanking);

export default leaderboardRouter;

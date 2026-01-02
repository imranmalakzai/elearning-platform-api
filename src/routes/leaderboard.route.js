import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import {
  globalRanking,
  courseRanking,
} from "../controllers/leaderboard.controller.js";
const leaderboardRouter = express.Router();

leaderboardRouter.use(auth);
/**
 * @swagger
 * tags:
 *   name: Leaderboard
 *   description: Leaderboard rankings for users
 */

/**
 * @swagger
 * /leaderboards/global:
 *   get:
 *     summary: Get global leaderboard
 *     tags: [Leaderboard]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of users ranked globally
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   rank:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *                   points:
 *                     type: integer
 *                     example: 1500
 */
leaderboardRouter.route("/global").get(globalRanking);

/**
 * @swagger
 * /leaderboards/{courseId}:
 *   get:
 *     summary: Get leaderboard for a specific course
 *     tags: [Leaderboard]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of users ranked for the course
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   rank:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Jane Smith"
 *                   points:
 *                     type: integer
 *                     example: 500
 */
leaderboardRouter.route("/:courseId").get(courseRanking);

export default leaderboardRouter;

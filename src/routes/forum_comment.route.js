import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.mddleware.js";
import {
  commentSchmea,
  updateCommentSchma,
} from "../validation/forum_comment.schema.js";
import {
  postComment,
  editComment,
  deleteComment,
  getCommentById,
  forumPostComments,
} from "../controllers/forum_comments.controller.js";

const commentRouter = express.Router({ mergeParams: true });
commentRouter.use(auth);
/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a comment on a forum post
 *     tags: [Forum Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForumCommentCreate'
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

commentRouter.route("/").post(validate(commentSchmea), postComment);
/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Get all comments for a forum post
 *     tags: [Forum Comments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of comments
 *       401:
 *         description: Unauthorized
 */

commentRouter.route("/").get(forumPostComments);
/**
 * @swagger
 * /comments/{commentId}:
 *   get:
 *     summary: Get a comment by ID
 *     tags: [Forum Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comment data
 *       404:
 *         description: Comment not found
 *       401:
 *         description: Unauthorized
 */

commentRouter.route("/:commentId").get(getCommentById);
/**
 * @swagger
 * /comments/{commentId}:
 *   patch:
 *     summary: Update a forum comment
 *     tags: [Forum Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForumCommentUpdate'
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Comment not found
 */

commentRouter
  .route("/:commentId")
  .patch(validate(updateCommentSchma), editComment);

/**
 * @swagger
 * /comments/{commentId}:
 *   delete:
 *     summary: Delete a forum comment
 *     tags: [Forum Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Comment not found
 */

commentRouter.route("/:commentId").delete(deleteComment);

export default commentRouter;

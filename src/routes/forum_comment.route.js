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
 * tags:
 *   name: Forum Comments
 *   description: Comments on forum posts
 */

/**
 * @swagger
 * /courses/{courseId}/forums/{postId}/comments:
 *   post:
 *     summary: Create a comment on a forum post
 *     tags: [Forum Comments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [content]
 *             properties:
 *               content:
 *                 type: string
 *                 example: This post helped me a lot.
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
 * /courses/{courseId}/forums/{postId}/comments:
 *   get:
 *     summary: Get all comments of a forum post
 *     tags: [Forum Comments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of comments
 *       401:
 *         description: Unauthorized
 */
commentRouter.route("/").get(forumPostComments);

/**
 * @swagger
 * /courses/{courseId}/forums/{postId}/comments/{commentId}:
 *   get:
 *     summary: Get a comment by ID
 *     tags: [Forum Comments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comment fetched successfully
 *       404:
 *         description: Comment not found
 */
commentRouter.route("/:commentId").get(getCommentById);

/**
 * @swagger
 * /courses/{courseId}/forums/{postId}/comments/{commentId}:
 *   patch:
 *     summary: Update a forum comment
 *     tags: [Forum Comments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
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
 *             type: object
 *             required: [content]
 *             properties:
 *               content:
 *                 type: string
 *                 example: Updated comment text
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Comment not found
 */
commentRouter
  .route("/:commentId")
  .patch(validate(updateCommentSchma), editComment);

/**
 * @swagger
 * /courses/{courseId}/forums/{postId}/comments/{commentId}:
 *   delete:
 *     summary: Delete a forum comment
 *     tags: [Forum Comments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 */
commentRouter.route("/:commentId").delete(deleteComment);

export default commentRouter;

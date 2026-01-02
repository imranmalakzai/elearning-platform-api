import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import {
  createForumPost,
  updateForumPost,
  getPostById,
  deletePost,
  forumPosts,
} from "../controllers/forum_posts.controller.js";
import {
  createPostShema,
  updatePostShema,
} from "../validation/forum_post.schema.js";
import { validate } from "../middlewares/validate.mddleware.js";

const forumPostRouter = express.Router({ mergeParams: true });

forumPostRouter.use(auth);

/**
 * @swagger
 * tags:
 *   name: Forum Posts
 *   description: Forum posts under a course (enrolled student only)
 */

/**
 * @swagger
 * /courses/{courseId}/forums:
 *   post:
 *     summary: Create a forum post
 *     tags: [Forum Posts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
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
 *                 example: This course is really helpful.
 *     responses:
 *       201:
 *         description: Forum post created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
forumPostRouter.route("/").post(validate(createPostShema), createForumPost);

/**
 * @swagger
 * /courses/{courseId}/forums:
 *   get:
 *     summary: Get all forum posts of a course
 *     tags: [Forum Posts]
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
 *         description: List of forum posts
 *       401:
 *         description: Unauthorized
 */
forumPostRouter.route("/").get(forumPosts);

/**
 * @swagger
 * /courses/{courseId}/forums/{postId}:
 *   delete:
 *     summary: Delete a forum post (owner && instructor only)
 *     tags: [Forum Posts]
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
 *         description: Forum post deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */
forumPostRouter.route("/:postId").delete(deletePost);

/**
 * @swagger
 * /courses/{courseId}/forums/{postId}:
 *   patch:
 *     summary: Update a forum post (owner only)
 *     tags: [Forum Posts]
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
 *                 example: Updated forum post content
 *     responses:
 *       200:
 *         description: Forum post updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */
forumPostRouter
  .route("/:postId")
  .patch(validate(updatePostShema), updateForumPost);

/**
 * @swagger
 * /courses/{courseId}/forums/{postId}:
 *   get:
 *     summary: Get a forum post by ID
 *     tags: [Forum Posts]
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
 *         description: Forum post fetched successfully
 *       404:
 *         description: Post not found
 *       401:
 *         description: Unauthorized
 */
forumPostRouter.route("/:postId").get(getPostById);

export default forumPostRouter;

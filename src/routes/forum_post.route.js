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
 * /forums:
 *   post:
 *     summary: Create a forum post
 *     tags: [Forum Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForumPostCreate'
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
 * /forums:
 *   get:
 *     summary: Get all forum posts
 *     tags: [Forum Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of forum posts
 *       401:
 *         description: Unauthorized
 */

forumPostRouter.route("/").get(forumPosts);
/**
 * @swagger
 * /forums/{postId}:
 *   delete:
 *     summary: Delete a forum post
 *     tags: [Forum Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 * /forums/{postId}:
 *   patch:
 *     summary: Update a forum post
 *     tags: [Forum Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *             $ref: '#/components/schemas/ForumPostUpdate'
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
 * /forums/{postId}:
 *   get:
 *     summary: Get a forum post by ID
 *     tags: [Forum Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Forum post data
 *       404:
 *         description: Post not found
 *       401:
 *         description: Unauthorized
 */

forumPostRouter.route("/:postId").get(getPostById);

export default forumPostRouter;

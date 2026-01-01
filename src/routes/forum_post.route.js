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

forumPostRouter.route("/").post(validate(createPostShema), createForumPost);
forumPostRouter.route("/").get(forumPosts);
forumPostRouter.route("/:postId").delete(deletePost);
forumPostRouter
  .route("/:postId")
  .patch(validate(updatePostShema), updateForumPost);
forumPostRouter.route("/:postId").get(getPostById);

export default forumPostRouter;

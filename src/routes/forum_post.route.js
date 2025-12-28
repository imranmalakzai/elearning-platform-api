import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import {
  createForumPost,
  updateForumPost,
  getPostById,
  deletePost,
  forumPosts,
} from "../controllers/forum_posts.controller.js";

const forumPostRouter = express.Router({ mergeParams: true });

forumPostRouter.use(auth);

forumPostRouter.route("/").post(createForumPost);
forumPostRouter.route("/").get(forumPosts);
forumPostRouter.route("/:postId").delete(deletePost);
forumPostRouter.route("/:postId").patch(updateForumPost);
forumPostRouter.route("/:postId").get(getPostById);

export default forumPostRouter;

import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import {
  postComment,
  editComment,
  deleteComment,
  getCommentById,
  forumPostComments,
} from "../controllers/forum_comments.controller.js";

const commentRouter = express.Router({ mergeParams: true });
commentRouter.use(auth);

commentRouter.route("/").post(postComment);
commentRouter.route("/").get(forumPostComments);
commentRouter.route("/:commentId").get(getCommentById);
commentRouter.route("/:commentId").patch(editComment);
commentRouter.route("/commentId").delete(deleteComment);

export default commentRouter;

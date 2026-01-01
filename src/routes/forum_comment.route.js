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
import { updateComment } from "../repository/forum_comments.repository.js";

const commentRouter = express.Router({ mergeParams: true });
commentRouter.use(auth);

commentRouter.route("/").post(validate(commentSchmea), postComment);
commentRouter.route("/").get(forumPostComments);
commentRouter.route("/:commentId").get(getCommentById);
commentRouter
  .route("/:commentId")
  .patch(validate(updateCommentSchma), editComment);
commentRouter.route("/:commentId").delete(deleteComment);

export default commentRouter;

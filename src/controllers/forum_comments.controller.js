import asycHandler from "../utils/async_handler.js";
import ApiError from "../utils/api_error.js";
import { getCourseById } from "../repository/courses.repository.js";
import { getPostById } from "../repository/forums.post.repository.js";
import { isEnrolled } from "../repository/enrollments.repository.js";
import {
  createComment,
  getcommentById,
  deleteACommnet,
  updateComment,
  comments as postComments,
} from "../repository/forum_comments.repository.js";

//** post a comment to a course forum post */
export const postComment = asycHandler(async (req, res) => {
  const { courseId, postId } = req.params;
  const { content } = req.body;

  //course exist
  const course = await getCourseById(courseId);
  if (!course) throw new ApiError("course not exist", 404);

  //post exist
  const post = await getPostById(postId);
  if (!post) throw new ApiError("post not exist", 404);

  //check inrolled ?
  const user = isEnrolled(courseId, req.user.id);
  const instructor = course.instructor_id.toString() === req.user.id.toString();
  if (!user && !instructor) throw new ApiError("Access denied", 403);

  //comment
  if (!content) throw new ApiError("please provide content", 409);
  const comment = await createComment({
    post_id: postId,
    user_id: req.user.id,
    content,
  });
  if (comment === 0) throw new ApiError("Internal server error", 500);
  res.status(201).json({ message: "comment added" });
});

//** edit comment */
export const editComment = asycHandler(async (req, res) => {
  const { courseId, postId, commentId } = req.params;
  const { content } = req.body;

  //course exist
  const course = await getCourseById(courseId);
  if (!course) throw new ApiError("course not exist", 404);

  //post exist
  const post = await getPostById(postId);
  if (!post) throw new ApiError("post not exist", 404);

  //comment exist
  const comment = await getcommentById(commentId);
  if (!comment) throw new ApiError("comment not exist", 404);

  //is commenter ?
  if (comment.user_id.toString() !== req.user.id.toString()) {
    throw new ApiError("Access denied", 403);
  }

  //update comment
  if (!content) throw new ApiError("please provide content");
  const update = await updateComment(content, commentId);

  //chech does comment updated ?
  if (update === 0) throw new ApiError("Internal server error", 500);

  res.status(200).json({ message: "comment updated successfully" });
});

//**Delete comment (Owner,post Owner)  only*/
export const deleteComment = asycHandler(async (req, res) => {
  const { courseId, postId, commentId } = req.params;

  //course exist
  const course = await getCourseById(courseId);
  if (!course) throw new ApiError("course not exist", 404);

  //post exist
  const post = await getPostById(postId);
  if (!post) throw new ApiError("post not exist", 404);

  //comment exist
  const comment = await getcommentById(commentId);
  if (!comment) throw new ApiError("comment not exist", 404);

  //check owner ships ?
  const commentOwner = comment.user_id.toString() === req.user.id.toString();
  const postOwner = post.user_id.toString() === req.user.id.toString();

  if (!commentOwner && !postOwner) {
    throw new ApiError("Access denied", 403);
  }

  //delete post
  const result = await deleteACommnet(commentId);
  if (result === 0) throw new ApiError("Internal server error", 500);

  res.status(200).json({ message: "comment deleted" });
});

//**Get all comments of A post (instructor,enrolled students only) */
export const forumPostComments = asycHandler(async (req, res) => {
  const { courseId, postId } = req.params;

  //course exist
  const course = await getCourseById(courseId);
  if (!course) throw new ApiError("course not exist", 404);

  //is enrolled || instructor
  const student = await isEnrolled(courseId, req.user.id);
  const instructor = course.instructor_id.toString() === req.user.id.toString();

  if (!student && !instructor)
    throw new ApiError("you are not enrolled in this course", 403);

  //post exist
  const post = await getPostById(postId);
  if (!post) throw new ApiError("post not exist", 404);

  const comments = await postComments(postId);
  res.status(200).json({ comments: comments || [] });
});

//**Get a comment by Id */
export const getCommentById = asycHandler(async (req, res) => {
  const { courseId, postId, commentId } = req.params;

  //course exist
  const course = await getCourseById(courseId);
  if (!course) throw new ApiError("course not exist", 404);

  //check enromments
  const user = await isEnrolled(courseId, req.user.id);
  const instructor = course.instructor_id.toString() === req.user.id.toString();

  if (!user && !instructor) throw new ApiError("access denied", 403);

  //post exist
  const post = await getPostById(postId);
  if (!post) throw new ApiError("post not exist", 404);

  //comment exist
  const comment = await getcommentById(commentId);
  if (!comment) throw new ApiError("comment not exist", 404);

  res.status(200).json({ comment });
});

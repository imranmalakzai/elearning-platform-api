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
  const { course_id, post_id } = req.params;
  const { content } = req.body;

  //course exist
  const course = await getCourseById(course_id);
  if (!course) throw new ApiError("course not exist", 404);

  //post exist
  const post = await getPostById(post_id);
  if (!post) throw new ApiError("post not exist", 404);

  //check inrolled ?
  const user = isEnrolled(course_id, req.user.id);
  const instructor = course.instructor_id.toString() === req.user.id.toString();
  if (!user && !instructor) throw new ApiError("Access denied", 403);

  //comment
  if (!content) throw new ApiError("please provide content", 409);

  const comment = await createComment({
    post_id,
    user_id: req.user.id,
    content,
  });
  if (!comment) throw new ApiError("Internal server error", 500);
  res.status(200).json({ message: "comment added" });
});

//** edit comment */
export const editComment = asycHandler(async (req, res) => {
  const { course_id, post_id, comment_id } = req.params;
  const { content } = req.body;

  //course exist
  const course = await getCourseById(course_id);
  if (!course) throw new ApiError("course not exist", 404);

  //post exist
  const post = await getPostById(post_id);
  if (!post) throw new ApiError("post not exist", 404);

  //comment exist
  const comment = await getcommentById(comment_id);
  if (!comment) throw new ApiError("comment not exist", 404);

  //is commenter ?
  if (comment.user_id.toString() !== req.user.id) {
    throw new ApiError("Access denied", 403);
  }

  //update comment
  if (!content) throw new ApiError("please provide content");
  const update = await updateComment(content, comment_id);

  //chech does comment updated ?
  if (!update) throw new ApiError("Internal server error", 500);

  res.status(200).json({ message: "comment updated successfully" });
});

//**Delete comment (Owner,post Owner)  only*/
export const deleteComment = asycHandler(async (req, res) => {
  const { course_id, post_id, comment_id } = req.params;

  //course exist
  const course = await getCourseById(course_id);
  if (!course) throw new ApiError("course not exist", 404);

  //post exist
  const post = await getPostById(post_id);
  if (!post) throw new ApiError("post not exist", 404);

  //comment exist
  const comment = await getcommentById(comment_id);
  if (!comment) throw new ApiError("comment not exist", 404);

  //check owner ships ?
  const commentOwner = comment.user_id.toString() === req.user.id.toString();
  const postOwner = post.user_id.toString() === req.user.id.toString();

  if (!commentOwner && !postOwner) {
    throw new ApiError("Access denied", 403);
  }

  //delete post
  const result = await deleteACommnet(comment_id);
  if (!result) throw new ApiError("Internal server error", 500);
});

//**Get all comments of A post (instructor,enrolled students only) */
export const forumPostComments = asycHandler(async (req, res) => {
  const { course_id, post_id } = req.params;

  //course exist
  const course = await getCourseById(course_id);
  if (!course) throw new ApiError("course not exist", 404);

  //post exist
  const post = await getPostById(post_id);
  if (!post) throw new ApiError("post not exist", 404);

  //is enrolled || instructor
  const student = await isEnrolled(course_id, req.user.id);
  const instructor = course.instructor_id.toString() === req.user.id;

  if (!student && !instructor) throw new ApiError("please enrolled first", 403);

  const comments = await postComments(post_id);
  res.status(200).json({ comments: comments || [] });
});

import asyncHandler from "../utils/async_handler.js";
import ApiError from "../utils/api_error.js";
import { getCourseById } from "../repository/courses.repository.js";
import { isEnrolled } from "../repository/enrollments.repository.js";
import {
  createPost,
  userPost,
  updatePost,
  deleteForumPost,
  coursePosts,
} from "../repository/forums.post.repository.js";

//**create a post (Instroucter,enrolled student) only */
export const createForumPost = asyncHandler(async (req, res) => {
  const { course_id } = req.params;
  const { content } = req.body;

  const course = await getCourseById(course_id);
  if (!course) throw new ApiError("course not exist", 404);

  const student = await isEnrolled(course_id, req.user.id);
  const instructor = course.instructor_id.toString() === req.user.id.toString();

  if (!student && !instructor) throw new ApiError("please enrolled first", 403);
  if (!content) throw new ApiError("please provide content", 409);

  const post = await createPost({ content, course_id, user_id: req.user.id });
  if (!post) throw new ApiError("Internal server error", 500);
  res.status(200).json({ message: "post created successfully" });
});

//**update a post user who created the post only */
export const updateForumPost = asyncHandler(async (req, res) => {
  const { course_id, post_id } = req.params;
  const { content } = req.body;

  const course = await getCourseById(course_id);
  if (!course) throw new ApiError("post not exist", 404);

  const user = isEnrolled(course_id, req.user.id);
  if (!user) throw new ApiError("unauthorized", 403);

  const post = await userPost(post_id);
  if (!post) throw new ApiError("post not exist", 404);

  //ensure creater of the post
  if (post.user_id.toString() !== req.user.id.toString()) {
    throw new ApiError("unauthorized", 403);
  }
  if (!content) throw new ApiError("please provide content", 409);

  const result = await updatePost(content, post_id);
  if (!result) throw new ApiError("Internal server error", 500);
  res.status(200).json({ message: "post updated successfully" });
});

//**Delete a post  */
export const deletePost = asyncHandler(async (req, res) => {
  const { course_id, post_id } = req.params;

  const course = await getCourseById(course_id);
  if (!course) throw new ApiError("post not exist", 404);

  const user = isEnrolled(course_id, req.user.id);
  if (!user) throw new ApiError("unauthorized", 403);

  const post = await userPost(post_id);
  if (!post) throw new ApiError("post not exist", 404);

  //ensure creater of the post
  if (post.user_id.toString() !== req.user.id.toString()) {
    throw new ApiError("unauthorized", 403);
  }

  const result = await deleteForumPost(post_id);
  if (!result) throw new ApiError("internal server error", 500);

  res.status(204).json({ message: "Record delete successfully" });
});

//**GET ALL post belongs to a course module (Enrolled student & instructor only) */
export const forumPosts = asyncHandler(async (req, res) => {
  const { course_id } = req.params;

  //is course exist
  const course = await getCourseById(course_id);
  if (!course) throw new ApiError("course not exist", 404);

  //check is enrolled student or owner
  const student = await isEnrolled(course_id, req.user.id);
  const instructor = course.instructor_id.toString() === req.user.id.toString();

  //only instructor or student
  if (!student && !instructor) throw new ApiError("please enrolled first", 403);

  //result
  const posts = await coursePosts(course_id);
  res.status(200).json({ posts: posts || [] });
});

//**Get a forum post byId */
export const getPostById = asyncHandler(async (req, res) => {
  const { course_id, postId } = req.params;

  const course = await getCourseById(course_id);
  if (!course) throw new ApiError("post not exist", 404);

  const user = isEnrolled(course_id, req.user.id);
  if (!user) throw new ApiError("unauthorized", 403);

  const post = await userPost(postId);
  if (!post) throw new ApiError("post not exist", 404);

  res.status(200).json();
});

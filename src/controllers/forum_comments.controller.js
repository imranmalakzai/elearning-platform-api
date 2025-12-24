import asycHandler from "../utils/async_handler.js";
import ApiError from "../utils/api_error.js";
import { getCourseById } from "../repository/courses.repository.js";
import { getPostById } from "../repository/forums.post.repository.js";
import { isEnrolled } from "../repository/enrollments.repository.js";
import { createComment } from "../repository/forum_comments.repository.js";

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

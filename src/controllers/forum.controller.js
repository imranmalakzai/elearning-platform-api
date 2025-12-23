import asyncHandler from "../utils/async_handler.js";
import ApiError from "../utils/api_error.js";
import { getCourseById } from "../repository/courses.repository.js";
import { isEnrolled } from "../repository/enrollments.repository.js";
import { createPost } from "../repository/forums.post.repository.js";

//**create a post (Instroucter,enrolled student) only */
export const createForumPost = asyncHandler(async (req, res) => {
  const { course_id } = req.params;
  const { content } = req.body;

  const course = await getCourseById(course_id);
  if (!course) throw new ApiError("course not exist", 404);

  const enrolled = await isEnrolled(course_id, req.user.id);
  if (enrolled || course.instructor_id.toString() === req.user.id.toString()) {
    //check post content
    if (!content) throw new ApiError("please provide content", 409);

    const post = await createPost({ content, course_id, user_id: req.user.id });
    if (!post) throw new ApiError("Internal server error", 500);
    res.status(200).json({ message: "post created successfully" });
  } else {
    throw new ApiError("unauthorized", 403);
  }
});

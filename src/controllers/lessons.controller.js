import asyncHandler from "../utils/async_handler.js";
import ApiError from "../utils/api_error.js";
import { getCourseById } from "../repository/courses.repository.js";
import { createLessons } from "../repository/lessons.repository.js";

//**create a lesson for a course (Instructor only) */
export const createLesson = asyncHandler(async (req, res) => {
  const { course_id } = req.params.course_id;
  const { title, content, video_url, lesson_order } = req.body;

  const course = await getCourseById(course_id);
  if (!course) throw new ApiError("Course not exist", 404);

  //insure user is the creater of the course
  if (course.instructor_id !== req.user.id) {
    throw new ApiError("unauthorize", 403);
  }
  if (!title || !content || !video_url || !lesson_order) {
    throw new ApiError("All fields are requried", 400);
  }
  const result = await createLessons({
    course_id,
    title,
    content,
    video_url,
    lesson_order,
  });
  if (!result) throw new ApiError("Internal server error", 500);
  res.status(201).json({ message: "lesson created successfully" });
});

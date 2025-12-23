import asyncHandler from "../utils/async_handler.js";
import ApiError from "../utils/api_error.js";
import { getCourseById } from "../repository/courses.repository.js";
import {
  createLessons,
  updateLessons,
  getLessonById,
  deleteLessons,
} from "../repository/lessons.repository.js";

//**create a lesson for a course (Instructor only) */
export const createLesson = asyncHandler(async (req, res) => {
  const { course_id } = req.params;
  const { title, content, video_url, lesson_order } = req.body;

  const course = await getCourseById(course_id);
  if (!course) throw new ApiError("Course not exist", 404);

  //insure user is the creater of the course
  if (course.instructor_id.toString() !== req.user.id.toString()) {
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

//**UPDATE A LESSON (Instructor only) */
export const updateLesson = asyncHandler(async (req, res) => {
  const { course_id, lesson_id } = req.params;
  const { title, content, video_url, lesson_order } = req.body;

  const course = await getCourseById(course_id);
  if (!course) throw new ApiError("Course not exist", 404);

  //insure user is the creater of the course
  if (course.instructor_id.toString() !== req.user.id.toString()) {
    throw new ApiError("unauthorize", 403);
  }
  const lesson = await getLessonById(lesson_id);
  if (!lesson) throw new ApiError("Course not exist", 404);

  if (!title || !content || !video_url || !lesson_order) {
    throw new ApiError("All fields are requried", 400);
  }
  const result = await updateLessons({
    course_id,
    title,
    content,
    video_url,
    lesson_order,
  });
  if (!result) throw new ApiError("Internal server error", 500);
  res.status(200).json({ message: "lesson updated successfully" });
});

//**Delete lesson (Instructor only) */
export const deleteLesson = asyncHandler(async (req, res) => {
  const { course_id, lesson_id } = req.params;

  const course = await getCourseById(course_id);
  if (!course) throw new ApiError("course not exist", 404);

  //ensure course belongs to the user
  if (course.instructor_id.toString() !== req.user.id.toString()) {
    throw new ApiError("unauthorize", 403);
  }

  const lesson = await getLessonById(lesson_id);
  if (!lesson) throw new ApiError("Lesson not exist", 404);

  const result = await deleteLessons(lesson_id);
  if (!result) throw new ApiError("internal server error ", 500);
  res.status(200).json({ message: "Lesson deleted successfully" });
});

import asyncHandler from "../utils/async_handler.js";
import ApiError from "../utils/api_error.js";
import { getCourseById } from "../repository/courses.repository.js";
import {
  createLessons,
  updateLessons,
  getLessonById,
  getCourseLessons,
  deleteLessons,
} from "../repository/lessons.repository.js";

//**create a lesson for a course (Instructor only) */
export const createLesson = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { title, content, video_url, lesson_order } = req.body;

  if (!title || !content || !video_url || !lesson_order) {
    throw new ApiError("All fields are requried", 400);
  }

  const course = await getCourseById(courseId);
  if (!course) throw new ApiError("Course not exist", 404);

  //insure user is the creater of the course
  if (course.instructor_id.toString() !== req.user.id.toString()) {
    throw new ApiError("Access denied", 403);
  }

  const result = await createLessons({
    course_id: courseId,
    title,
    content,
    video_url,
    lesson_order,
  });
  if (result === 0) throw new ApiError("Internal server error", 500);
  res.status(201).json({ message: "lesson created successfully" });
});

//**UPDATE A LESSON (Instructor only) */
export const updateLesson = asyncHandler(async (req, res) => {
  const { courseId, lessonId } = req.params;
  const { title, content, video_url, lesson_order } = req.body;

  const course = await getCourseById(courseId);
  if (!course) throw new ApiError("Course not exist", 404);

  //insure user is the creater of the course
  if (course.instructor_id.toString() !== req.user.id.toString()) {
    throw new ApiError("unauthorize", 403);
  }
  const lesson = await getLessonById(lessonId);
  if (!lesson) throw new ApiError("lesson not exist", 404);

  if (!title || !content || !video_url || !lesson_order) {
    throw new ApiError("All fields are requried", 400);
  }
  const result = await updateLessons({
    course_id: courseId,
    title,
    content,
    video_url,
    lesson_order,
  });
  if (result === 0) throw new ApiError("Internal server error", 500);
  res.status(200).json({ message: "lesson updated successfully" });
});

//**Delete lesson (Instructor only) */
export const deleteLesson = asyncHandler(async (req, res) => {
  const { courseId, lessonId } = req.params;

  const course = await getCourseById(courseId);
  if (!course) throw new ApiError("course not exist", 404);

  //ensure course belongs to the user
  if (course.instructor_id.toString() !== req.user.id.toString()) {
    throw new ApiError("unauthorize", 403);
  }

  const lesson = await getLessonById(lessonId);
  if (!lesson) throw new ApiError("Lesson not exist", 404);

  const result = await deleteLessons(lessonId);
  if (result === 0) throw new ApiError("internal server error ", 500);
  res.status(200).json({ message: "Lesson deleted successfully" });
});

//**Get course All  lessons */
export const courseLessons = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const course = await getCourseById(courseId);
  if (!course) throw new ApiError("course not exist", 404);
  const lessons = await getCourseLessons(courseId);
  res.status(200).json({ lessons, success: true });
});

//**Get lesson by Id */
export const getLesson = asyncHandler(async (req, res) => {
  const { courseId, lessonId } = req.params;
  const course = await getCourseById(courseId);
  if (!course) throw new ApiError("course not exist", 404);
  const lesson = await getLessonById(lessonId);
  if (!lesson) throw new ApiError("Lesson not exist", 404);
  res.status(200).json({ lesson });
});

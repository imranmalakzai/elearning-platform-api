import asynHandler from "../utils/async_handler.js";
import {
  courseLesson,
  totalLessons,
} from "../repository/lessons.repository.js";
import { getCourseById } from "../repository/courses.repository.js";
import { isEnrolled } from "../repository/enrollments.repository.js";
import ApiError from "../utils/api_error.js";
import {
  markLessonCompleteAndGiveReward,
  completeLessons,
  lessonCompleted,
} from "../repository/lessons_progress.repository.js";

export const markLessonComplete = asynHandler(async (req, res) => {
  const { courseId, lessonId } = req.params;
  //course exist
  const course = await getCourseById(courseId);
  if (!course) throw new ApiError("course not exist", 404);

  //is usered enrolled
  const user = await isEnrolled(courseId, req.user.id);
  if (!user) throw new ApiError("enrolled user only", 403);

  //lesson exist
  const lessons = await courseLesson(courseId, lessonId);
  if (!lessons) throw new ApiError("Lesson not found", 403);

  //check is it not complted
  const completed = await lessonCompleted(req.user.id, lessonId);
  if (completed) throw new ApiError("Lesson already completed", 400);

  //10 marks per lesson complete
  const score = 10;

  const result = await markLessonCompleteAndGiveReward(
    req.user.id,
    lessonId,
    score
  );
  if (result === 0) throw new Api("Internal server error", 500);
  res.status(201).json({ message: "lesson completed successfully" });
});

//**Get current course progress */
export const courseProgress = asynHandler(async (req, res) => {
  const { courseId } = req.params;

  //course exist
  const course = await getCourseById(courseId);
  if (!course) throw new ApiError("Course not exist", 404);

  //user enrolled
  const user = await isEnrolled(courseId, req.user.id);
  if (!user) throw new ApiError("please enrolled first", 404);

  //total course lessons
  const total = await totalLessons(courseId);

  //completed lessons
  const completed = await completeLessons(courseId, req.user.id);

  const result = Math.round((completed / total) * 100);
  res.status(200).json({ progress: `${result}%` });
});

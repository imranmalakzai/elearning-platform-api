import asynHandler from "../utils/async_handler.js";
import {
  getLessonById,
  courseLesson,
} from "../repository/lessons.repository.js";
import { getCourseById } from "../repository/courses.repository.js";
import { isEnrolled } from "../repository/enrollments.repository.js";
import ApiError from "../utils/api_error.js";
import { markLessonCompleteAndGiveReward } from "../repository/lessons_progress.repository.js";

const markLessonComplete = asynHandler(async (req, res) => {
  const { lesson_id, course_id } = req.params;

  //course exist
  const course = await getCourseById(course_id);
  if (!course) throw new ApiError("course not exist", 404);

  //is usered enrolled
  const user = await isEnrolled(course_id, req.user.id);
  if (!user) throw new ApiError("enrolled user only", 403);

  //lesson exist
  const lessons = await courseLesson(course_id, lesson_id);
  if (!lessons) throw new ApiError("Lesson not found", 403);

  //10 marks per lesson complete
  const score = 10;

  const result = await markLessonCompleteAndGiveReward(
    req.user.id,
    lesson_id,
    score
  );

  if (!result) throw new Api("Internal server error");
});

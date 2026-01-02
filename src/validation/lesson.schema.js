import { z } from "zod";

//  title, content, video_url, lesson_order
export const createLessonSchema = z.object({
  title: z
    .string()
    .min(3, "lesson title must not be less then 3 characters")
    .max(50, "lesson title must not be more then 50 characters"),
  content: z
    .string()
    .min(15, "lesson content must not be less then 15 characters")
    .max(1000, "lesson content must not be more then 1000 characters"),
  video_url: z.string(),
  lesson_order: z
    .number()
    .int("please provide number only")
    .positive("please provide valid lesson order"),
});

export const updateLessonSchema = z.object({
  title: z
    .string()
    .min(3, "lesson title must not be less then 3 characters")
    .max(20, "lesson title must not be more then 20 characters"),
  content: z
    .string()
    .min(15, "lesson content must not be less then 15 characters")
    .max(1000, "lesson content must not be more then 1000 characters"),
  video_url: z.string(),
  lesson_order: z
    .number()
    .int("please provide number only")
    .positive("please provide valid lesson order"),
});

import { z } from "zod";

export const createCourseShema = z.object({
  title: z
    .string()
    .min(8, "course title must be at least 8 characters")
    .max(50, "course title should not be more then 50 character"),
  description: z
    .string()
    .min(50, "course description must be at least 50 characters")
    .max(1000, "course description must not be more then 1000 characters"),
});

export const updateCourseShema = z.object({
  title: z
    .string()
    .min(8, "course title must be at least 8 characters")
    .max(50, "title should not be more then 50 character"),
  description: z
    .string()
    .min(50, "course description must be at least 50 characters")
    .max(1000, "course description must not be more then 1000 characters"),
});

export const courseIdSchema = z.object({
  courseId: z
    .number("Invalid course id")
    .int()
    .positive("please provide positive number"),
});

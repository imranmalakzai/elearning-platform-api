import { z } from "zod";

export const createCourseShema = z.object({
  title: z
    .string()
    .min(8, "title must be at least 8 characters")
    .max(50, "title should not be more then 50 character"),
  description: z
    .string()
    .min(50, "description must be at least 50 characters")
    .max(1000, "course description must not be more then 1000 characters"),
});

export const updateCourseShema = z.object({
  title: z
    .string()
    .min(8, "title must be at least 8 characters")
    .max(50, "title should not be more then 50 character"),
  description: z
    .string()
    .min(50, "description must be at least 50 characters")
    .max(1000, "course description must not be more then 1000 characters"),
});

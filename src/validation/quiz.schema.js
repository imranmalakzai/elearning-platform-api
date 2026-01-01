import { string, z } from "zod";

export const createQuizSchema = z.object({
  title: string()
    .min(5, "quizz title should not be less then 5 characters")
    .max(50, "quizz title should not be more then 50 characters"),
});

export const updateQuizSchema = z.object({
  title: string()
    .min(5, "quizz title should not be less then 5 characters")
    .max(50, "quizz title should not be more then 50 characters"),
});

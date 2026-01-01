import { z } from "zod";

export const quizAttemptSchema = z.object({
  answers: z
    .array(
      z.object({
        question_id: z
          .number({
            required_error: "question_id is required",
            invalid_type_error: "question id must be a number",
          })
          .int("question_id must be an integer")
          .positive("question_id must be positive number"),
        selected_option: z.enum(["a", "b", "c", "d"], {
          errorMap: () => ({
            message: "selected option must be one of : a,b,c, or d",
          }),
        }),
      })
    )
    .min(1, "At least one answer is required"),
});

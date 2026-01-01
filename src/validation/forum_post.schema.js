import { z } from "zod";

export const createPostShema = z.object({
  content: z
    .string()
    .min(10, "Post content should be at least 10 characters ")
    .max(1000, "post content should not be more then 1000 characters"),
});

export const updatePostShema = z.object({
  content: z
    .string()
    .min(10, "Post content should be at least 10 characters ")
    .max(1000, "post content should not be more then 1000 characters"),
});

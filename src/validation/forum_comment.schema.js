import { z } from "zod";

export const commentSchmea = z.object({
  content: z
    .string()
    .max(500, "comment lenght should not be more then 500 character"),
});

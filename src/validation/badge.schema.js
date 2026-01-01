import { z } from "zod";

export const createBadgeSchema = z.object({
  name: z
    .string()
    .min(3, "badge name should be at leaet 3 character")
    .max(10, "badge name should not be more then 10 characters"),
  description: z
    .string()
    .min(5, "badge description should be at least 5 characters")
    .max(25, "badge description should not be more then 25 characters"),
  points_required: z
    .number("please provide number")
    .int("please provide positive number")
    .gte(10, "required points should be more then 10")
    .lte(5000, "required points should not be more then 5000"),
});

export const updateBadgeSchema = z.object({
  name: z
    .string()
    .min(3, "badge name should be at leaet 3 character")
    .max(10, "badge name should not be more then 10 characters"),
  description: z
    .string()
    .min(5, "badge description should be at least 5 characters")
    .max(25, "badge description should not be more then 25 characters"),
  points_required: z
    .number("please provide number")
    .int("please provide positive number")
    .gte(10, "required points should be more then 10")
    .lte(5000, "required points should not be more then 5000"),
});

import { email, z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "name must be not be less then 3 characters")
    .max(15, "name must not be more then 15 charcters "),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "password must be more then 6 characters")
    .max(15, "password must not be more then 15 characters"),
});

export const loginShema = z.object({
  email: z.string().email("Invalid emaill address"),
  password: z
    .string()
    .min(6, "password must be more then 6 characters")
    .max(15, "password must not be more then 15 characters"),
  s,
});

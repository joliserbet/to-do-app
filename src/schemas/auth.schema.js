import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: "Username is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must contain at least 6 characters" }),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "Email is not valid" }),
  password: z
    .string()
    .min(6, { message: "Password must contain at least 6 characters" }),
});

import { z } from "zod";

export const taskSchema = z.object({
  task: z.string({ required_error: "Task must be specified" }),
  description: z.string().optional(),
  date: z.string().datetime().optional(),
});

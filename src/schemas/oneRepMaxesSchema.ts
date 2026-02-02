import * as z from "zod";

export const OneRepMax = z.object({
  id: z.number(),
  user_id: z.number(),
  exercise_name: z.string(),
  original_one_rep_max: z.number(),
  current_one_rep_max: z.number(),
});

export const OneRepMaxSchema = z.array(OneRepMax);
export type OneRepMaxResponse = z.infer<typeof OneRepMaxSchema>;

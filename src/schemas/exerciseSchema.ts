import * as z from "zod";

export const ExerciseSchema = z.object({
  id: z.number(),
  name: z.string(),
  equipment_type: z.string(),
  weight_increment: z.number(),
});

export const ExerciseListSchema = z.array(ExerciseSchema);

export type Exercise = z.infer<typeof ExerciseSchema>;
export type ExerciseList = z.infer<typeof ExerciseListSchema>;

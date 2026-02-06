import * as z from "zod";

export const ExerciseHistoryEntrySchema = z.object({
  date: z.string(),
  weight: z.number(),
  sets_completed: z.number().nullable(),
  target_sets: z.number(),
  reps_in_reserve: z.number().nullable(),
});

export const ExerciseHistorySchema = z.object({
  exercise_id: z.number(),
  exercise_name: z.string().nullable(),
  history: z.array(ExerciseHistoryEntrySchema),
});

export type ExerciseHistoryEntry = z.infer<typeof ExerciseHistoryEntrySchema>;
export type ExerciseHistory = z.infer<typeof ExerciseHistorySchema>;

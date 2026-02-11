import * as z from "zod";

export const ProgramSummarySchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const ProgramExerciseSchema = z.object({
  id: z.number(),
  exercise_name: z.string(),
  target_sets: z.number(),
  target_reps: z.number(),
  intensity: z.number(),
  optional: z.boolean(),
  equipment_type: z.string(),
});

export const ProgramDaySchema = z.object({
  day: z.number(),
  exercises: z.array(ProgramExerciseSchema),
});

export const ProgramDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  days: z.array(ProgramDaySchema),
});

export const ProgramsListSchema = z.array(ProgramSummarySchema);

export type ProgramSummary = z.infer<typeof ProgramSummarySchema>;
export type ProgramExercise = z.infer<typeof ProgramExerciseSchema>;
export type ProgramDay = z.infer<typeof ProgramDaySchema>;
export type ProgramDetail = z.infer<typeof ProgramDetailSchema>;
